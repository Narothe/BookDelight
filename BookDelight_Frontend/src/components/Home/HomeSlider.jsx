import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import { Navigation, Pagination, Autoplay } from 'swiper/modules';
import {Link} from "react-router-dom";
import TruncateText from "../../utils/TruncateText";

// Home page slider with books
// It displays books with covers

function HomeSlider({ books, photoUrl }) {
    const booksWithCovers = books.filter((book) => book.photo_path);

    console.log('books' , books);

    return (
        <div className="w-full border rounded-md shadow-md bg-custom-new-white p-4">
            <h2 className="text-2xl font-semibold mb-4 text-center">Perhaps this is what you are looking for?</h2>
            {booksWithCovers.length > 0 ? (
                <Swiper
                    modules={[Navigation, Pagination, Autoplay]}
                    spaceBetween={20}
                    slidesPerView={3}
                    navigation
                    pagination={{ clickable: true }}
                    autoplay={{ delay: 5000 }}
                    breakpoints={{
                        1: { slidesPerView: 1 },
                        670: { slidesPerView: 2 },
                        1024: { slidesPerView: 3 },
                        1280: { slidesPerView: 4 },
                        1600: { slidesPerView: 5 },
                    }}
                >
                    {booksWithCovers.map((book) => (
                        <SwiperSlide key={book.id} className="flex justify-center">
                            <Link to={`/book/${book.id_book}`}>
                                <div className="bg-white shadow-md rounded-md p-4 mb-4 w-72 h-72">
                                    <img
                                        src={`${photoUrl}${book.photo_path}`}
                                        alt={book.title}
                                        className="w-full h-40 object-cover rounded-md mb-4"
                                    />
                                    {/*<h3 className="text-lg font-semibold">{book.title}</h3>*/}
                                    <div className="text-lg font-semibold">
                                        {TruncateText(book.title, 50)}
                                    </div>
                                    {/*<p className="text-sm text-gray-600 mt-2">*/}
                                    {/*    {book.authors.join(', ')}*/}
                                    {/*</p>*/}
                                    <div className="text-sm text-gray-600 mt-2">
                                        {TruncateText(book.authors.join(', '), 30)}
                                    </div>
                                </div>
                            </Link>
                        </SwiperSlide>
                    ))}
                </Swiper>
            ) : (
                <p className="text-center text-gray-500">No books with covers available.</p>
            )}
        </div>
    );
}

export default HomeSlider;
