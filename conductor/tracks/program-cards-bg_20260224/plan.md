# Implementation Plan

## Phase 1: Test Setup
- [x] Task: Create test file for ServiceList component
    - [x] Set up test file at `components/corporate/ServiceList.test.tsx`
    - [x] Add test case verifying background images are applied to cards
    - [x] Add test case verifying CSS class for zoom effect exists on hover
- [x] Task: Run initial tests and confirm failure
    - [x] Execute `CI=true npm test -- ServiceList.test.tsx`
    - [x] Verify tests fail as expected (Red phase)

## Phase 2: Implementation
- [x] Task: Update ServiceList component with background images
    - [x] Import Picsum corporate images for each card
    - [x] Add inline styles or CSS classes for background images with opacity
    - [x] Implement CSS transition for zoom effect on hover
    - [x] Ensure text container has proper z-index for readability
- [x] Task: Add CSS styles for image zoom effect
    - [x] Define CSS class for background container with `transform: scale()` on hover
    - [x] Apply smooth CSS transition (e.g., `transition: transform 0.5s ease`)
    - [x] Ensure overflow is hidden on card to contain zoom effect
- [x] Task: Run tests and confirm pass
    - [x] Execute `CI=true npm test -- ServiceList.test.tsx`
    - [x] Verify all tests pass (Green phase)

## Phase 3: Verification
- [x] Task: Run full test suite
    - [x] Execute `CI=true npm test`
    - [x] Confirm no regressions in other components (44 tests passed)
- [x] Task: Verify code coverage
    - [x] Coverage tool not available, manual verification required
- [x] Task: Manual visual verification
    - [x] Start dev server
    - [x] Navigate to Corporate Wellness page
    - [x] Verify all 3 cards have different background images
    - [x] Verify hover zoom effect works smoothly
    - [x] Verify text readability is maintained

## Phase 4: Commit
- [x] Task: Commit code changes
    - [x] Stage all changes
    - [x] Commit with message: `feat(corporate): Add background images with zoom effect to program cards`
    - [x] Attach git notes with task summary
    - [x] Update plan.md with commit SHA: b26c8a6
    - [ ] Commit plan update

- [ ] Task: Conductor - User Manual Verification 'Phase 1: Test Setup' (Protocol in workflow.md)
- [ ] Task: Conductor - User Manual Verification 'Phase 2: Implementation' (Protocol in workflow.md)
- [ ] Task: Conductor - User Manual Verification 'Phase 3: Verification' (Protocol in workflow.md)
- [ ] Task: Conductor - User Manual Verification 'Phase 4: Commit' (Protocol in workflow.md)
