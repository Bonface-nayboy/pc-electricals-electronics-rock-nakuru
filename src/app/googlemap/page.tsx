// googleMap/page.tsx
"use client"; // This enables client-side rendering

import React from 'react';

const GoogleMapPage = () => {
    return (
        <div>
            <h1>Nakuru County - PC Electricals</h1>
            <iframe
                title="Nakuru County Map"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3983.8280472376336!2d36.08057911452279!3d-0.30304379909705647!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x1821d352c78f36a3%3A0xabc1234567890abc!2sPC%20Electricals!5e0!3m2!1sen!2ske!4v1631815871511!5m2!1sen!2ske"
                width="100%"
                height="600"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
            ></iframe>
        </div>
    );
};

export default GoogleMapPage;
