# Optima

## Overview
Optima is a lightweight, single-session web application designed for groups to efficiently reach a consensus on a list of items using a margin-sensitive Elo algorithm. The application ensures a **snappy, distraction-free UX** and requires **no sign-in or persistent data storage**.

## Features
- **Single-session, ephemeral usage** (no user accounts or data storage)
- **Fast, responsive UI** optimized for desktop and mobile
- **Deterministic decision-making** with an Elo-based ranking system
- **Simple and intuitive workflow** for entering items, voting, and ranking
- **Automatic elimination of weak options** for efficient decision-making

## User Flow
1. **Home Screen**: Users enter a list of items to be ranked.
2. **Voter Entry**: Participants enter their names to vote.
3. **Voting Round**: Items are matched up in an **A vs. B** format for voting.
4. **Ranking Calculation**: An Elo-based algorithm determines the strongest options.
5. **Final Results**: A ranked list is displayed with an option to copy results or restart.

## Technology Stack
- **Frontend:** Next.js (React, TypeScript, Tailwind CSS)
- **State Management:** React Context / useState
- **Deployment:** Vercel

## Installation & Development
### Prerequisites
- Node.js (latest stable version)
- npm or yarn

### Setup
1. Clone the repository:
   ```sh
   git clone https://github.com/noahtf13/Optima
   cd Optima
   ```
2. Install dependencies:
   ```sh
   npm install  # or yarn install
   ```
3. Run the development server:
   ```sh
   npm run dev  # or yarn dev
   ```
4. Open the app in your browser at `http://localhost:3000`.

## Deployment
To deploy on **Vercel**:
1. Install the Vercel CLI:
   ```sh
   npm install -g vercel
   ```
2. Deploy the project:
   ```sh
   vercel
   ```

## Contribution
Contributions are welcome! Please follow these steps:
1. Fork the repository
2. Create a feature branch (`git checkout -b feature-name`)
3. Commit your changes (`git commit -m "Added new feature"`)
4. Push the branch (`git push origin feature-name`)
5. Submit a pull request

## License
This project is licensed under the MIT License.

## Contact
For any questions or feedback, please open an issue in the repository or reach out to the maintainer.
