# Quick Decision Maker - Development Plan

## **1. Project Breakdown**
The Quick Decision Maker will be built iteratively in small, logical steps. Each step ensures that we have a working and integrated piece of functionality before moving forward.

### **Core Iterative Chunks**
1. **Project Setup**: Initialize Next.js, TypeScript, and Tailwind CSS.
2. **Home Screen UI**: Implement the initial UI for entering items.
3. **Voter Entry Screen**: Build a UI for adding voters.
4. **Voting Logic**: Implement the voting interface and state management.
5. **Elo Algorithm**: Develop and integrate the margin-sensitive Elo rating system.
6. **Results Screen**: Display ranked results and provide interaction options.
7. **Performance & UX Optimization**: Ensure snappy UI, animations, and smooth transitions.
8. **Testing & Deployment**: Write unit tests, test edge cases, and deploy on Vercel.

Each chunk will be broken into small steps to be implemented sequentially.

---

## **2. Development Steps and LLM Prompts**

### **Step 1: Project Setup**
#### **1.1 Initialize Next.js with TypeScript**
```text
Generate a new Next.js project with TypeScript. Install Tailwind CSS for styling and configure the project for local development.
```

#### **1.2 Set Up Tailwind CSS**
```text
Configure Tailwind CSS in a Next.js project, ensuring global styles are applied correctly.
```

#### **1.3 Create Basic Page Structure**
```text
Set up the main layout component in Next.js, ensuring navigation and basic styling with Tailwind CSS.
```

---

### **Step 2: Home Screen UI**
#### **2.1 Implement Input UI for Items**
```text
Create a React component with an input field where users can enter decision items. Each entry should appear in a list. Include a "Clear All" button.
```

#### **2.2 Enable "Next" Button on Minimum Entries**
```text
Modify the input component so that the "Next" button becomes enabled only when at least 3 items are entered.
```

#### **2.3 Implement Navigation to Voter Entry Screen**
```text
Add a button that navigates to the voter entry screen once the minimum number of items is entered.
```

---

### **Step 3: Voter Entry Screen**
#### **3.1 Implement Input UI for Voters**
```text
Create a React component for entering voter names. Each entry should appear in a list. Require at least 2 voters before enabling the "Start Voting" button.
```

#### **3.2 Ensure Duplicate Voter Names are Prevented**
```text
Modify the input logic to prevent duplicate voter names from being entered.
```

#### **3.3 Implement Navigation to Voting Screen**
```text
Add a button that navigates to the voting screen once the minimum number of voters is entered.
```

---

### **Step 4: Voting Logic**
#### **4.1 Implement Voting UI**
```text
Create a voting UI with two large buttons for "Option A" and "Option B," and three selection buttons (Left, IDK, Right) for each voter.
```

#### **4.2 Enable Confirmation Once All Votes Are Cast**
```text
Ensure the "Confirm & Next" button is disabled until all voters have made a selection.
```

#### **4.3 Implement State Management for Votes**
```text
Store votes for each voter in component state, allowing changes before confirmation.
```

#### **4.4 Implement Matchup Progress Bar**
```text
Add a visual progress indicator that updates dynamically as voting progresses.
```

---

### **Step 5: Elo Algorithm**
#### **5.1 Implement Elo Rating System**
```text
Write a TypeScript function that calculates Elo rating adjustments based on a margin-sensitive formula.
```

#### **5.2 Integrate Elo Logic into Matchup Progression**
```text
Modify the voting screen to update the Elo scores dynamically after each matchup is confirmed.
```

#### **5.3 Implement Automatic Elimination of Weakest Options**
```text
Enhance the Elo logic to remove options that can no longer mathematically reach the top rank.
```

---

### **Step 6: Results Screen**
#### **6.1 Display Ranked Items**
```text
Create a final results screen that lists all items ranked by Elo score.
```

#### **6.2 Add "Copy Results" and "Restart" Buttons**
```text
Implement buttons to copy results to the clipboard and restart the decision-making process.
```

---

### **Step 7: Performance & UX Optimization**
#### **7.1 Optimize Rendering Performance**
```text
Optimize React state updates to ensure minimal re-renders and smooth UI interactions.
```

#### **7.2 Add Smooth Transitions Between Screens**
```text
Use animations to create smooth transitions between matchups and screens.
```

#### **7.3 Implement Mobile Responsiveness**
```text
Ensure the UI is fully responsive and adapts well to different screen sizes.
```

---

### **Step 8: Testing & Deployment**
#### **8.1 Write Unit Tests for Key Functions**
```text
Write Jest tests for the Elo rating calculations and voting logic.
```

#### **8.2 Test Edge Cases**
```text
Manually test scenarios with extreme votes, ties, and invalid inputs to ensure robustness.
```

#### **8.3 Deploy to Vercel**
```text
Deploy the finalized Next.js application to Vercel and verify its functionality in production.
```
