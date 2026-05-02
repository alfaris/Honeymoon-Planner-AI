# Security Specification - Honeymoon Planner AI

## Data Invariants
1. A user profile (`/users/{uid}`) can only be created with the same `uid` as the authenticated user.
2. A saved trip can only be created in the path `/users/{uid}/saved_trips/{tripId}` if the `uid` matches the authenticated user.
3. The `userId` field in the `SavedTrip` data must strictly match the authenticated user's `uid`.
4. Users cannot modify the `createdAt` timestamp after creation.
5. Users can only modify a subset of fields in their profile (e.g., `displayName`, `photoURL`, `updatedAt`).

## The "Dirty Dozen" Payloads

1. **Identity Spoofing (Write)**: Create a user profile for someone else.
   - Path: `/users/victim_uid`
   - Payload: `{ uid: 'victim_uid', email: 'attacker@evil.com' }`
   - Result: `PERMISSION_DENIED`

2. **Identity Spoofing (Save Trip)**: Save a trip to another user's path.
   - Path: `/users/victim_uid/saved_trips/trip1`
   - Payload: `{ userId: 'attacker_uid', title: 'My Trip' }`
   - Result: `PERMISSION_DENIED`

3. **Field Poisoning (userId)**: Save a trip to my path but claim someone else owns it.
   - Path: `/users/attacker_uid/saved_trips/trip1`
   - Payload: `{ userId: 'victim_uid', title: 'Stolen' }`
   - Result: `PERMISSION_DENIED`

4. **Shadow Field Injection**: Add a `isAdmin: true` field to a user profile.
   - Path: `/users/attacker_uid` (update)
   - Payload: `{ displayName: 'Me', isAdmin: true }`
   - Result: `PERMISSION_DENIED` (hasOnly check)

5. **Resource Exhaustion**: Use a very long string as a trip ID.
   - Path: `/users/attacker_uid/saved_trips/A_VERY_LONG_ID_..._1KB_STRING`
   - Result: `PERMISSION_DENIED` (isValidId check)

6. **PII Leakage (Read)**: Get another user's profile.
   - Path: `/users/victim_uid`
   - Result: `PERMISSION_DENIED` (isOwner check)

7. **PII Leakage (List)**: Try to list all users.
   - Path: `/users`
   - Result: `PERMISSION_DENIED` (Default deny)

8. **Timestamp Spoofing (Create)**: Set a `createdAt` in the past.
   - Path: `/users/attacker_uid` (create)
   - Payload: `{ uid: 'attacker_uid', email: 'me@me.com', createdAt: '2000-01-01' }`
   - Result: `PERMISSION_DENIED` (request.time check)

9. **Timestamp Spoofing (Update)**: Modify `createdAt`.
   - Path: `/users/attacker_uid/saved_trips/trip1` (update)
   - Payload: `{ title: 'New Title', createdAt: '2026-01-01' }`
   - Result: `PERMISSION_DENIED` (affectedKeys check)

10. **State Shortcut**: Delete another user's trip.
    - Path: `/users/victim_uid/saved_trips/trip1` (delete)
    - Result: `PERMISSION_DENIED` (isOwner check)

11. **Malicious ID injection**: Use special characters in the ID.
    - Path: `/users/attacker_uid/saved_trips/../../system/config`
    - Result: `PERMISSION_DENIED` (matches pattern check)

12. **Anonymous Access**: Try to write without being signed in.
    - Path: `/users/some_uid`
    - Result: `PERMISSION_DENIED` (isSignedIn check)
