## Next.js (React) app featuring a Dashboard for exchange rate data within a 2-year time span

Built with: Next.js, React, JavaScript, Material UI, Frankfurter API, Chart.js, ag-grid-react.

Deployed app on Vercel: 

The app will be deployed to Vercel, but if you want to run it locally, clone this git repo to your machine and run `npm install`.
Then, run `npm run dev` to start the local dev server. The web app should be accessible at http://localhost:3000.

### Notes on running locally

If you decide to test the app locally on port 3000, seach for 2 API calls located at dashboard/page.js and components/Conversion.js and replace the URLs with the local
backend server URL (http://localhost:8000/api/exchange-rate-data).
