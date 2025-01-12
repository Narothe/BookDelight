import React, { useEffect, useState } from "react";
import axios from "axios";
import { Bar } from "react-chartjs-2";
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
} from "chart.js";
import { format, subWeeks, eachDayOfInterval } from "date-fns";

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

function StatisticsChart() {
    const [chartsData, setChartsData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [dateRange, setDateRange] = useState(2);
    const [debouncedDateRange, setDebouncedDateRange] = useState(dateRange);

    const generateDateRange = (weeks) => {
        const endDate = new Date();
        const startDate = subWeeks(endDate, weeks);
        return eachDayOfInterval({ start: startDate, end: endDate }).map((date) =>
            format(date, "dd-MM-yyyy")
        );
    };

    const fetchAndPrepareData = async () => {
        setLoading(true);
        try {
            const response = await axios.post(
                `${process.env.REACT_APP_BACKEND_URL}/statistics`,
                { date_range: debouncedDateRange }
            );

            const { results } = response.data;

            const dates = generateDateRange(debouncedDateRange);

            const datasets = {
                createdBooksAndUsers: {
                    labels: dates,
                    datasets: [
                        {
                            label: "Created Books",
                            data: dates.map((date) => {
                                const entry = results.created_books.find((item) => item.date === date);
                                return entry ? entry.count : 0;
                            }),
                            backgroundColor: "rgba(75, 192, 192, 0.6)",
                        },
                        {
                            label: "Created Users",
                            data: dates.map((date) => {
                                const entry = results.created_users.find((item) => item.date === date);
                                return entry ? entry.count : 0;
                            }),
                            backgroundColor: "rgba(54, 162, 235, 0.6)",
                        },
                    ],
                },
                reviewsAndReplies: {
                    labels: dates,
                    datasets: [
                        {
                            label: "Created Reviews",
                            data: dates.map((date) => {
                                const entry = results.created_reviews.find((item) => item.date === date);
                                return entry ? entry.count : 0;
                            }),
                            backgroundColor: "rgba(255, 206, 86, 0.6)",
                        },
                        {
                            label: "Created Replies",
                            data: dates.map((date) => {
                                const entry = results.created_replies.find((item) => item.date === date);
                                return entry ? entry.count : 0;
                            }),
                            backgroundColor: "rgba(153, 102, 255, 0.6)",
                        },
                    ],
                },
                addedToBookshelf: {
                    labels: dates,
                    datasets: [
                        {
                            label: "Currently Reading",
                            data: dates.map((date) => {
                                const entry = results.added_to_currently.find((item) => item.date === date);
                                return entry ? entry.count : 0;
                            }),
                            backgroundColor: "rgba(255, 99, 132, 0.6)",
                        },
                        {
                            label: "Wish to Read",
                            data: dates.map((date) => {
                                const entry = results.added_to_wish_to_read.find((item) => item.date === date);
                                return entry ? entry.count : 0;
                            }),
                            backgroundColor: "rgba(164,255,99,0.6)",
                        },
                        {
                            label: "Read Books",
                            data: dates.map((date) => {
                                const entry = results.added_to_read_books.find((item) => item.date === date);
                                return entry ? entry.count : 0;
                            }),
                            backgroundColor: "rgba(255,200,99,0.6)",
                        },
                        {
                            label: "Favorite Books",
                            data: dates.map((date) => {
                                const entry = results.added_to_favorites.find((item) => item.date === date);
                                return entry ? entry.count : 0;
                            }),
                            backgroundColor: "rgba(99,112,255,0.6)",
                        },
                    ],
                },
            };

            setChartsData(datasets);
        } catch (err) {
            console.error("Error fetching statistics data:", err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        const handler = setTimeout(() => {
            setDebouncedDateRange(dateRange);
        }, 400);

        return () => {
            clearTimeout(handler);
        };
    }, [dateRange]);

    useEffect(() => {
        fetchAndPrepareData();
    }, [debouncedDateRange]);

    if (loading) {
        return <p>Loading...</p>;
    }

    if (!chartsData) {
        return <p>No data available to display.</p>;
    }

    return (
        <div className="pt-4 border p-2 mb-4 shadow-md rounded-md bg-custom-new-white">
            <h2 className="text-2xl font-bold mb-4 font-mono text-center">Statistics Overview</h2>

            <div className="mb-4 flex justify-center">
                <label htmlFor="date-range" className="mr-2 font-semibold">
                    Select Date Range (weeks):
                </label>
                <input
                    id="date-range"
                    type="range"
                    min="1"
                    max="5"
                    value={dateRange}
                    onChange={(e) => setDateRange(Number(e.target.value))}
                    className="w-32"
                />
                <span className="ml-2">{dateRange} week{dateRange > 1 ? "s" : ""}</span>
            </div>

            <div className="grid lg:grid-cols-2 flex-wrap gap-2 flex-row">
                <div className="flex flex-col border p-4 mb-2 rounded-md shadow-md w-full bg-white">
                    <h3 className="text-xl font-semibold mb-2">Books and Users</h3>
                    <Bar
                        data={chartsData.createdBooksAndUsers}
                        options={{ responsive: true, plugins: { legend: { position: "top" } } }}
                    />
                </div>
                <div className="flex flex-col border p-4 mb-2 rounded-md shadow-md w-full bg-white">
                    <h3 className="text-xl font-semibold mb-2">Reviews and Replies</h3>
                    <Bar
                        data={chartsData.reviewsAndReplies}
                        options={{ responsive: true, plugins: { legend: { position: "top" } } }}
                    />
                </div>
                <div className="flex flex-col border p-4 mb-2 rounded-md shadow-md w-full bg-white">
                    <h3 className="text-xl font-semibold mb-2">Added to Bookshelves</h3>
                    <Bar
                        data={chartsData.addedToBookshelf}
                        options={{ responsive: true, plugins: { legend: { position: "top" } } }}
                    />
                </div>
            </div>
        </div>
    );
}

export default StatisticsChart;
