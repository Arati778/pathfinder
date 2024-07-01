// import { Radar } from "react-chartjs-2";
// import {
//   Chart as ChartJS,
//   LineElement,
//   PointElement,
//   Tooltip,
//   Legend,
//   RadialLinearScale,
//   Filler
// } from 'chart.js';

// ChartJS.register(
//   LineElement,
//   PointElement,
//   Tooltip,
//   Legend,
//   RadialLinearScale,
//   Filler
// );

// export default function RadarChartExample() {
//   const handleLabelClick = (event, label) => {
//     // Handle the click event for each label
//     console.log(`Clicked on label: ${label}`);
//   };

//   const data = {
//     labels: ['Mon', 'Tue', 'Wed', 'Thurs', 'Fri'],
//     datasets: [{
//       label: 'Reward',
//       data: [8, 9, 9, 8, 7],
//       backgroundColor: 'rgba(0, 255, 255, 0.5)', // Aqua with some transparency
//       borderColor: 'rgba(0, 255, 255, 1)', // Solid Aqua
//       pointBackgroundColor: 'rgba(255, 0, 0, 1)', // Solid Red for points
//       pointBorderColor: 'rgba(255, 0, 0, 1)',
//     }]
//   };

//   const options = {
//     onClick: (event, elements) => {
//       // Handle the click event for the entire chart
//       if (elements && elements.length > 0) {
//         const clickedLabel = data.labels[elements[0].index];
//         handleLabelClick(event, clickedLabel);
//       }
//     },
//     elements: {
//       line: {
//         borderWidth: 2,
//       },
//       point: {
//         radius: 5,
//         borderWidth: 2,
//       },
//     },
//     scales: {
//       r: {
//         pointLabels: {
//           font: {
//             size: 14,
//             weight: 'bold',
//           },
//         },
//         ticks: {
//           display: false, // Hide the ticks for a cleaner look
//         },
//       },
//     },
//   };

//   return (
//     <div>
//       <Radar data={data} options={options} />
//     </div>
//   );
// }
