**Developer Specification for Quick Decision Maker**

## **1. Overview**
A lightweight, no-sign-in, ephemeral web application designed for groups to quickly reach a consensus on a list of items through an efficient, deterministic, **this-or-that** decision-making process. The application prioritizes a **snappy, distraction-free UX** and leverages a **margin-sensitive Elo algorithm** to eliminate weak options as quickly as possible.

---
## **2. Core Requirements**

### **General Requirements**
- **Single-session, no persistent data storage**
- **No user accounts or sign-in required**
- **Responsive and fast UI** for both desktop and mobile
- **Deterministic elimination logic** ensures efficient decision-making
- **Voting process ensures full participation**, with an explicit "IDK" option

### **User Flow & UI**
#### **1. Home Screen (Session Start)**
- **Input Field:** Enter items (e.g., baby names, restaurants)
  - Type a name, press **Enter**, it appears in a list
  - "Clear All" button for quick resets
  - "Next" button (enabled after at least **3** items are entered)

#### **2. Voter Entry Screen**
- **Input Field:** Enter voter names
  - Same behavior as item entry (type, press **Enter** to add)
  - "Start Voting" button (enabled after at least **2** voters are entered)

#### **3. Voting Screen (A vs. B Matchups)**
- **Core Layout:**
  - Large **Option A (Left) vs. Option B (Right)**
  - Voter rows with each voter’s selection (Left / IDK / Right)
- **Voting Buttons:**
  - "Left" / "IDK" / "Right" per voter
  - Votes **can be changed** until confirmed
- **Confirmation Button:**
  - "Confirm & Next" (disabled until all votes are in)
  - Moves to the next matchup instantly
- **Progress Bar:**
  - Displays real-time progress as **remaining matchups / total matchups**
  - Example: **15 remaining matchups / 22 total matchups (7 completed)**

#### **4. Final Results Screen**
- **Ranked list of items** (sorted from strongest to weakest)
- **Copy Results Button** for easy sharing
- **Restart Session Button** to reset and start over

---
## **3. Algorithm & Data Handling**

### **Elo-Based Decision Algorithm**
- **Starting Condition:** All items begin with the same Elo score (**1500**)
- **Matchup Selection:**
  - Select **highest-ranked vs. lowest-ranked** option
  - If tied, randomly pick from available options
- **Voting Weighting:**
  - **Left wins:** 1 point per vote
  - **Right wins:** 1 point per vote
  - **IDK:** 0.5 points to both options
- **Elo Adjustment:**
  - Uses a **margin-sensitive Elo rating** with K-factor:
    
    \[ K = \frac{800}{(	ext{Total Options} - 1)} \]
  
  - Larger win margins result in greater Elo shifts
  - If an option **cannot mathematically reach #1**, it is eliminated silently

---
## **4. Technical Architecture**

### **Frontend:**
- **Framework:** Next.js with TypeScript
- **State Management:** Local component state (React Context or useState)
- **Styling:** Tailwind CSS for lightweight and fast styling

### **Backend (If Needed):**
- **No backend necessary** (client-side only)
- **LocalStorage / SessionStorage could be used** (optional, but not recommended since sessions are ephemeral)

---
## **5. Error Handling & Edge Cases**

### **Input Handling:**
- Prevent duplicate names or empty inputs
- Enforce at least 3 items and 2 voters before proceeding

### **Voting Edge Cases:**
- Ensure all voters have cast their votes before confirming
- Handle **even-number deadlocks** naturally (no tiebreaker mechanism)
- Prevent premature submission attempts with clear UI feedback

### **Elimination Logic:**
- Mathematically eliminate options **silently** (no distracting UI changes)
- Handle cases where multiple options are tied with randomized selection

---
## **6. Testing Plan**

### **Unit Tests:**
- Test Elo adjustment logic
- Ensure deterministic elimination behaves as expected
- Verify that all input validation works correctly

### **UI/UX Tests:**
- Ensure mobile and desktop compatibility
- Verify voting flows smoothly with multiple users
- Confirm snappy interactions with minimal delay

### **Edge Case Testing:**
- Inputting the **minimum required number of items/voters**
- Handling **large lists (10+ items)** efficiently
- **Extreme voting scenarios** (e.g., all voters choose IDK, landslide votes, continuous ties)

---
## **7. Deployment & Performance Considerations**

### **Hosting & Deployment:**
- Deploy via **Vercel (recommended for Next.js)**
- If using a **backend**, consider **serverless functions (AWS Lambda, Firebase Functions)**

### **Performance Considerations:**
- Optimize UI for **instant interactions** (minimize renders, debounce inputs)
- Lightweight assets for **fast load times**
- Ensure **snappy transitions** between matchups

---

## **Conclusion**
This specification outlines a **minimalist, high-speed, single-session decision-making tool** optimized for quick group consensus. With deterministic elimination, margin-sensitive Elo adjustments, and a distraction-free interface, this app will help groups make strong decisions efficiently. 
