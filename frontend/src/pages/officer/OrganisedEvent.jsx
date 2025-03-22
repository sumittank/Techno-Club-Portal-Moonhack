// import React, { useEffect, useState } from "react";
// import axios from "axios";

// const StudentsTable = () => {
//     const [students, setStudents] = useState([]);

//     // Fetch students from the backend
//     useEffect(() => {
//         axios.get("http://localhost:5000/api/users/students")
//             .then(response => setStudents(response.data))
//             .catch(error => console.error("Error fetching students:", error));
//     }, []);

//     // Function to predict AI score for a student
//     const predictScore = async (id, index) => {
//         try {
//             const student = students[index];
//             const response = await axios.post(`http://localhost:5000/predict-ai-score`, {
//                 total_events_attended: student.total_events_attended,
//                 total_events_hosted: student.total_events_hosted,
//                 years_since_joining: student.years_since_joining,
//                 events_organized: student.events_organized,
//                 _id: id
//             });

//             // Update the student's AI Credit Score in the table
//             const updatedStudents = [...students];
//             updatedStudents[index] = { ...student, ai_score: response.data["AI Credit Score"] };
//             setStudents(updatedStudents);
//         } catch (error) {
//             console.error("Error predicting AI Score:", error);
//         }
//     };

//     // **Separate students into two categories**
//     const studentsToPredict = students.filter(student => student.ai_score === undefined);
//     const leaderboard = students
//         .filter(student => student.ai_score !== undefined)
//         .sort((a, b) => b.ai_score - a.ai_score); // Sort descending

//     return (
//         <div className="p-8 bg-gradient-to-b from-blue-50 to-white min-h-screen">
//             {/* 🏆 Leaderboard Section */}
//             <div className="text-center mb-6">
//                 <h2 className="text-3xl font-extrabold text-gray-800">🏆 Student Leaderboard</h2>
//             </div>

//             {/* 🏅 Leaderboard Table */}
//             <div className="bg-white shadow-lg rounded-lg p-6">
//                 <h3 className="text-2xl font-semibold text-gray-800 mb-4">🏅 AI Score Leaderboard</h3>
//                 {leaderboard.length > 0 ? (
//                     <table className="w-full text-left border-collapse">
//                         <thead>
//                             <tr className="bg-green-500 text-white text-lg">
//                                 <th className="p-4 border rounded-tl-lg">🏅 Rank</th>
//                                 <th className="p-4 border">👤 Name</th>
//                                 <th className="p-4 border">🎟 Events Attended</th>
//                                 <th className="p-4 border">📢 Events Hosted</th>
//                                 <th className="p-4 border">📆 Years Since Joining</th>
//                                 <th className="p-4 border">📌 Events Organized</th>
//                                 <th className="p-4 border rounded-tr-lg">🔢 AI Credit Score</th>
//                             </tr>
//                         </thead>
//                         <tbody>
//                             {leaderboard.map((student, index) => (
//                                 <tr 
//                                     key={index} 
//                                     className={`border text-gray-700 text-lg transition-all duration-200 hover:bg-green-100 ${
//                                         index === 0 ? "bg-yellow-100 font-bold" : ""
//                                     }`}
//                                 >
//                                     <td className="p-4 border text-center">{index + 1}</td>
//                                     <td className="p-4 border">{student.name}</td>
//                                     <td className="p-4 border text-center">{student.total_events_attended}</td>
//                                     <td className="p-4 border text-center">{student.total_events_hosted}</td>
//                                     <td className="p-4 border text-center">{student.years_since_joining}</td>
//                                     <td className="p-4 border text-center">{student.events_organized ? "Yes" : "No"}</td>
//                                     <td className="p-4 border text-center text-green-600 font-semibold text-xl">
//                                         {student.ai_score}
//                                     </td>
//                                 </tr>
//                             ))}
//                         </tbody>
//                     </table>
//                 ) : (
//                     <p className="p-4 text-gray-500 text-lg">No AI Scores have been predicted yet.</p>
//                 )}
//             </div>

//             {/* 📊 AI Score Prediction Table */}
//             <div className="bg-white shadow-lg rounded-lg p-6 mb-10">
//                 <h3 className="text-2xl font-semibold text-gray-800 mb-4">📊 Predict AI Credit Score</h3>
//                 {studentsToPredict.length > 0 ? (
//                     <table className="w-full text-left border-collapse">
//                         <thead>
//                             <tr className="bg-blue-500 text-white text-lg">
//                                 <th className="p-4 border rounded-tl-lg">👤 Name</th>
//                                 <th className="p-4 border">🎟 Events Attended</th>
//                                 <th className="p-4 border">📢 Events Hosted</th>
//                                 <th className="p-4 border">📆 Years Since Joining</th>
//                                 <th className="p-4 border">📌 Events Organized</th>
//                                 <th className="p-4 border rounded-tr-lg">⚡ Predict</th>
//                             </tr>
//                         </thead>
//                         <tbody>
//                             {studentsToPredict.map((student, index) => (
//                                 <tr key={index} className="border text-gray-700 text-lg transition-all duration-200 hover:bg-blue-100">
//                                     <td className="p-4 border">{student.name}</td>
//                                     <td className="p-4 border text-center">{student.total_events_attended}</td>
//                                     <td className="p-4 border text-center">{student.total_events_hosted}</td>
//                                     <td className="p-4 border text-center">{student.years_since_joining}</td>
//                                     <td className="p-4 border text-center">{student.events_organized ? "Yes" : "No"}</td>
//                                     <td className="p-4 border text-center">
//                                         <button 
//                                             className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition duration-200"
//                                             onClick={() => predictScore(student._id, index)}
//                                         >
//                                             Predict
//                                         </button>
//                                     </td>
//                                 </tr>
//                             ))}
//                         </tbody>
//                     </table>
//                 ) : (
//                     <p className="p-4 text-gray-500 text-lg">✅ All students have been predicted.</p>
//                 )}
//             </div>

            
//         </div>
//     );
// };

// export default StudentsTable;


import React, { useEffect, useState } from "react";
import axios from "axios";

const StudentsTable = () => {
    const [students, setStudents] = useState([]);

    // Fetch students from the backend
    useEffect(() => {
        axios.get("http://localhost:5000/api/users/students")
            .then(response => setStudents(response.data))
            .catch(error => console.error("Error fetching students:", error));
    }, []);

    // Function to predict AI score for a student
    const predictScore = async (id, index) => {
        try {
            const student = students[index];
            const response = await axios.post(`http://localhost:5000/predict-ai-score`, {
                total_events_attended: student.total_events_attended,
                total_events_hosted: student.total_events_hosted,
                years_since_joining: student.years_since_joining,
                events_organized: student.events_organized,
                _id: id
            });

            // Update the student's AI Credit Score in the table
            const updatedStudents = [...students];
            updatedStudents[index] = { ...student, ai_score: response.data["AI Credit Score"] };
            setStudents(updatedStudents);
        } catch (error) {
            console.error("Error predicting AI Score:", error);
        }
    };

    // **Separate students into two categories**
    const studentsToPredict = students.filter(student => student.ai_score === undefined);
    const leaderboard = students
        .filter(student => student.ai_score !== undefined)
        .sort((a, b) => b.ai_score - a.ai_score); // Sort descending

    return (
        <div className="p-8 bg-gradient-to-b from-blue-50 to-white min-h-screen">
            {/* 🏆 Leaderboard Section */}
            {/* <div className="text-center mb-6">
                <h2 className="text-3xl font-extrabold text-gray-800">🏆 Student Leaderboard</h2>
            </div>
            <div className="text-center mb-6">
    <h2 className="text-3xl font-extrabold text-blue-600">🏆 Student Leaderboard</h2>
</div> */}
<div className="text-center mb-6">
    <h2 className="text-3xl font-extrabold text-primary">🏆 Student Leaderboard</h2>
</div>

            {/* 🏅 Leaderboard Table */}
            <div className="bg-white shadow-lg rounded-lg p-6 bootstrap">
                {/* <h3 className="text-2xl font-semibold text-gray-800 mb-4">🏅 AI Score Leaderboard</h3> */}
                <div className="bg-white shadow-lg rounded-lg p-6">
    <h3 className="text-2xl font-semibold text-success mb-4">🏅 AI Score Leaderboard</h3>
</div>

                {leaderboard.length > 0 ? (
                    <div className="overflow-x-auto">
                        <table className="table-auto w-full border-collapse">
                            <thead>
                                <tr className="bg-green-500 text-white text-lg">
                                    <th className="p-4 border rounded-tl-lg">🏅 Rank</th>
                                    <th className="p-4 border">👤 Name</th>
                                    <th className="p-4 border">🎟 Events Attended</th>
                                    <th className="p-4 border">📢 Events Hosted</th>
                                    <th className="p-4 border">📆 Years Since Joining</th>
                                    <th className="p-4 border">📌 Events Organized</th>
                                    <th className="p-4 border rounded-tr-lg">🔢 AI Credit Score</th>
                                </tr>
                            </thead>
                            <tbody>
                                {leaderboard.map((student, index) => (
                                    <tr 
                                        key={index} 
                                        className={`border text-gray-700 text-lg transition-all duration-200 hover:bg-green-100 ${
                                            index === 0 ? "bg-yellow-100 font-bold" : ""
                                        }`}
                                    >
                                        <td className="p-4 border text-center">{index + 1}</td>
                                        <td className="p-4 border">{student.name}</td>
                                        <td className="p-4 border text-center">{student.total_events_attended}</td>
                                        <td className="p-4 border text-center">{student.total_events_hosted}</td>
                                        <td className="p-4 border text-center">{student.years_since_joining}</td>
                                        <td className="p-4 border text-center">{student.events_organized ? "Yes" : "No"}</td>
                                        <td className="p-4 border text-center text-green-600 font-semibold text-xl">
                                            {student.ai_score}
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                ) : (
                    <p className="p-4 text-gray-500 text-lg">No AI Scores have been predicted yet.</p>
                )}
            </div>

            {/* 📊 AI Score Prediction Table */}
            <div className="bg-white shadow-lg rounded-lg p-6 mb-10 bootstrap">
            <div className="bg-white shadow-lg rounded-lg p-6 mb-10">
    <h3 className="text-2xl font-semibold text-primary mb-4">📊 Predict AI Credit Score</h3>
</div>
                {studentsToPredict.length > 0 ? (
                    <div className="overflow-x-auto">
                        <table className="table-auto w-full border-collapse">
                            <thead>
                                <tr className="bg-blue-500 text-white text-lg">
                                    <th className="p-4 border rounded-tl-lg">👤 Name</th>
                                    <th className="p-4 border">🎟 Events Attended</th>
                                    <th className="p-4 border">📢 Events Hosted</th>
                                    <th className="p-4 border">📆 Years Since Joining</th>
                                    <th className="p-4 border">📌 Events Organized</th>
                                    <th className="p-4 border rounded-tr-lg">⚡ Predict</th>
                                </tr>
                            </thead>
                            <tbody>
                                {studentsToPredict.map((student, index) => (
                                    <tr key={index} className="border text-gray-700 text-lg transition-all duration-200 hover:bg-blue-100">
                                        <td className="p-4 border">{student.name}</td>
                                        <td className="p-4 border text-center">{student.total_events_attended}</td>
                                        <td className="p-4 border text-center">{student.total_events_hosted}</td>
                                        <td className="p-4 border text-center">{student.years_since_joining}</td>
                                        <td className="p-4 border text-center">{student.events_organized ? "Yes" : "No"}</td>
                                        <td className="p-4 border text-center">
                                            <button 
                                                className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition duration-200"
                                                onClick={() => predictScore(student._id, index)}
                                            >
                                                Predict
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                ) : (
                    <p className="p-4 text-gray-500 text-lg">✅ All students have been predicted.</p>
                )}
            </div>
        </div>
    );
};

export default StudentsTable;

