## Next.js (React) app featuring a Dashboard for exchange rate data within a 2-year time span

Built with: Next.js, React, JavaScript, Material UI, Frankfurter API, Chart.js, ag-grid-react.

Deployed app on Netlify: https://dashboard-exchange-rate-data.netlify.app/

Deployed backend server on Render: https://dashboard-exchange-rates-be.onrender.com/api/exchange-rate-data

The app will be deployed to Netlify, but if you want to run it locally, clone this git repo to your machine and run `npm install`.
Then, run `npm run dev` to start the local dev server. The web app should be accessible at http://localhost:3000.

To run the backend server locally first by following the steps here: [https://github.com/quangtran1203/Dashboard-Exchange-Rates-BE]
and then replace the 2 API call URLs located at dashboard/page.js and components/Conversion.js with http://localhost:8000/api/exchange-rate-data
