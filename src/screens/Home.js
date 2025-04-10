import React, { useEffect, useState } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import Card from '../components/Card';

export default function HomePage() {
    const [search, setSearch] = useState('');
    const [workcat, setWorkCat] = useState([]);
    const [worker, setWorker] = useState([]);

    const loadData = async () => {
        try {
            let response = await fetch("http://localhost:5000/api/workersData", {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            response = await response.json();
            setWorkCat(response[0]);
            setWorker(response[1]);
        } catch (error) {
            console.error("Error loading data:", error);
        }
    }

    useEffect(() => {
        loadData();
    }, []);

    return (
        <div>
            <Navbar />
            <div id="carouselExampleFade" className="carousel slide carousel-fade" data-bs-ride="carousel" style={{ objectFit: "contain !important" }}>
                <div className="carousel-inner" id='carousel'>
                    <div className="carousel-caption" style={{ zIndex: "10" }}>
                        <div className="d-flex justify-content-center">
                            <input className="form-control me-2" type="search" placeholder="Search" aria-label="search" value={search} onChange={(e)=>{setSearch(e.target.value)}} />
                        </div>
                    </div>
                    <div className="carousel-item active">
                        <img src="https://source.unsplash.com/random/900x900/?home" className="d-block w-100" alt="..." />
                    </div>
                    <div className="carousel-item">
                        <img src="https://source.unsplash.com/random/900x900/?office" className="d-block w-100" alt="..." />
                    </div>
                    <div className="carousel-item">
                        <img src="https://source.unsplash.com/random/900x900/?interior" className="d-block w-100" alt="..." />
                    </div>
                </div>
                <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleFade" data-bs-slide="prev">
                    <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                    <span className="visually-hidden">Previous</span>
                </button>
                <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleFade" data-bs-slide="next">
                    <span className="carousel-control-next-icon" aria-hidden="true"></span>
                    <span className="visually-hidden">Next</span>
                </button>
            </div>
            <div className='container'>
                {workcat.length !== 0 ? (
                    workcat.map((data, index) => (
                        <div key={index}>
                            <div className="fs-3 m-3">{data.CategoryName}</div>
                            <hr />
                            <div className="row row-cols-1 row-cols-md-2 row-cols-lg-4 g-4">
                                {worker.length !== 0 ? (
                                    worker.filter((item) => (item.CategoryName === data.CategoryName) && (item.name.toLowerCase().includes(search.toLowerCase()))).map((filterItems) => (
                                        <div key={filterItems._id} className="col">
                                            <Card worker={filterItems}  options={filterItems.options[0]}  ></Card>
                                        </div>
                                    ))
                                ) : (
                                    <div className="col">No workers found</div>
                                )}
                            </div>
                        </div>
                    ))
                ) : (
                    <div>No categories available</div>
                )}
            </div>
            <Footer />
        </div>
    );
}
