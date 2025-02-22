# Quick Decision Maker - Development To-Do List

## **1. Project Setup**
- [x] Initialize a Next.js project with TypeScript
- [x] Install Tailwind CSS and configure it properly
- [x] Set up global styles and base layout component

## **2. Home Screen UI**
- [X] Create an input field for entering decision items
- [X] Display entered items in a list
- [X] Implement a "Clear All" button to reset entries
- [X] Enable the "Next" button only when at least 3 items are entered
- [X] Implement navigation to the voter entry screen

## **3. Voter Entry Screen**
- [X] Create an input field for entering voter names
- [X] Display entered voters in a list
- [X] Ensure duplicate names are not allowed
- [X] Enable the "Start Voting" button only when at least 2 voters are entered
- [X] Implement navigation to the voting screen

## **4. Voting Logic**
- [ ] Create a voting UI with Option A vs. Option B
- [ ] Display three selection buttons (Left, IDK, Right) for each voter
- [ ] Store votes in component state and allow modifications before confirmation
- [ ] Disable "Confirm & Next" button until all voters have made a selection
- [ ] Implement a dynamic progress bar for matchups

## **5. Elo Algorithm**
- [ ] Write a TypeScript function to calculate Elo rating adjustments
- [ ] Integrate Elo logic into the matchup system
- [ ] Ensure votes impact Elo scores correctly
- [ ] Implement automatic elimination for weakest options
- [ ] Validate Elo calculations against test cases

## **6. Results Screen**
- [ ] Create a final results screen displaying ranked items
- [ ] Implement a "Copy Results" button for easy sharing
- [ ] Add a "Restart Session" button to reset and start over

## **7. Performance & UX Optimization**
- [ ] Optimize state updates to minimize re-renders
- [ ] Add smooth screen transitions and animations
- [ ] Ensure full mobile responsiveness
- [ ] Improve accessibility (keyboard navigation, contrast, etc.)

## **8. Testing & Deployment**

- [ ] Write unit tests for Elo logic and voting system
- [ ] Test edge cases (ties, extreme votes, invalid inputs)
- [ ] Perform UI/UX testing on different devices
- [X] Deploy the app to Vercel
- [X] Verify production functionality and fix any issues
