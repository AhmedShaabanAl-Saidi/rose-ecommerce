# PR Review Fixes Plan

Address the review points for PR #60.

## Proposed Changes

### [Component] Change Password

#### [MODIFY] [change-password.component.ts](file:///c:/Users/msamy5/Desktop/Web/Advanced%20Angular/Elevate/apps/E-commerce/src/app/feature/profile/components/change-password/change-password.component.ts)
- Import `ValidationsUtils`.
- Replace local `passwordMatchValidator` with `ValidationsUtils.matchFieldsValidator('newPassword', 'rePassword')`.
- Remove the local method definition.

### [Component] My Account

#### [MODIFY] [my-account.component.ts](file:///c:/Users/msamy5/Desktop/Web/Advanced%20Angular/Elevate/apps/E-commerce/src/app/feature/profile/components/my-account/my-account.component.ts)
- Update `onSubmit()` to handle three cases:
  1. Only profile data changed.
  2. Only photo changed.
  3. Both changed.
- If the form is valid but not dirty, and a file is selected, only call `uploadPhoto`.

### [Data Access] Auth API

#### [MODIFY] [auth-res.ts](file:///c:/Users/msamy5/Desktop/Web/Advanced%20Angular/Elevate/libs/auth/data-access/src/lib/dto/auth-res.ts)
- Add `UploadPhotoRes` interface: `export type UploadPhotoRes = DeleteMeRes;` (since both are `{ message: string }`).

#### [MODIFY] [auth-api.service.ts](file:///c:/Users/msamy5/Desktop/Web/Advanced%20Angular/Elevate/libs/auth/data-access/src/lib/api/auth-api.service.ts)
- Update `uploadPhoto` return type to `Observable<UploadPhotoRes>`.

## Verification Plan

### Automated Tests
- N/A (Manual verification via code review and build check)

### Manual Verification
- Verify that Change Password still works and validates matching passwords.
- Verify that My Account can update just the photo, just the info, or both.
- Ensure the project builds without type errors.
