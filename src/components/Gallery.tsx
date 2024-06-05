import React, { useEffect, useState } from "react";
import axios from "axios";
import Slider from "react-slick";
// import "slick-carousel/slick/slick.css";
// import "slick-carousel/slick/slick-theme.css";

const Gallery: React.FC = () => {
    
    const [gallery, setGallery] = useState<any[]>([]);
    const [user, setUser] = useState<any | null>(null);
    const [selectedImage, setSelectedImage] = useState<string | null>(null);
    const savedUser = localStorage.getItem('user');

    useEffect(() => {
        const fetchGallery = async () => {
            if (savedUser) {
                try {
                    const user = JSON.parse(savedUser);
                    setUser(user); // Set the user state
                    const response = await axios.get(`https://jsonplaceholder.typicode.com/users/${user.id}/photos`);
                    setGallery(response.data);
                } catch (error) {
                    console.log("Error fetching data", error);
                }
            }
        };

        fetchGallery();
    }, [savedUser]);

    const settings = {
        dots: false,
        infinite: true,
        speed: 500,
        slidesToShow: 3,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 3000,
    };

    const handleImageClick = (url: string) => {
        setSelectedImage(url);
    };

    const handleCloseModal = (e: React.MouseEvent<HTMLDivElement>) => {
        if (e.target === e.currentTarget) {
            setSelectedImage(null);
        }
    };

    return (
        <div className="container mx-auto px-4">
            <h2 className="text-xl font-semibold mt-4 mb-2 text-white">Gallery</h2>
            {/* {gallery.length === 0 ? (
                <p className="text-white">No gallery available</p>
            ) : ( */}
                <Slider {...settings}>
                    {gallery.map(photo => (
                        <div key={photo.id} className="p-2" onClick={() => handleImageClick(photo.url)}>
                            <img src={photo.thumbnailUrl} alt={photo.title} className="w-full h-auto rounded-lg" />
                            <p className="text-center text-white mt-2">{photo.title}</p>
                        </div>
                    ))}
                </Slider>
            {/* )} */}
            {selectedImage && (
                <div className="modal" onClick={handleCloseModal}>
                    <div className="modal-content">
                        <img src={selectedImage} alt="Selected" />
                    </div>
                </div>
            )}
        </div>
    );
};

export default Gallery;
