// "use client"; // This enables client-side rendering

// import React from 'react';
// import { Box, Button, Card, CardMedia, Typography } from '@mui/material';
// import SearchPage from '@/components/searchbar/page';
// import { AddLocation } from '@mui/icons-material';
// import { useRouter } from 'next/navigation';
// import Footer from './ffooter/page';


// const HomePage = () => {
//   const router = useRouter(); // Initialize the router

//   const handleMapClick = () => {
//     router.push('/googlemap'); // Navigate to GoogleMapPage
//   };

//   return (
//     <Box>
//       <Card>
//         <CardMedia
//           component="img"
//           sx={{ height: { xs: 95, sm: 150 } }}
//           image="https://images.pexels.com/photos/301792/pexels-photo-301792.jpeg?auto=compress&cs=tinysrgb&w=600"
//           title="Electronic Products"
//         />
//         <Box
//           sx={{
//             position: 'absolute',
//             // backgroundColor: 'black',
//             top: '10.5%',
//             left: '50%',
//             transform: 'translate(-50%, -50%)',
//             color: 'white',
//             textAlign: 'center',
//             fontWeight: 'bold',
//             fontSize: { xs: '1.2rem', sm: '1.5rem' },
//             backgroundColor: 'rgba(0, 0, 0, 0.3)',
//             padding: '2px',
//             borderRadius: '8px',
//             width: { xs: '95%', sm: '95%', md: '98.2%' }, // Responsive width
//             display: 'flex',
//             flexDirection: 'column', // Stack items vertically
//             alignItems: 'center', // Center align items
//           }}
//         >
//           <Typography variant='h4' sx={{ marginTop: '10%' }}>
//             PC Electricals And  Electronics
//           </Typography>
//           <Box sx={{ width: '100%', display: 'flex', justifyContent: 'flex-end', padding: '0 10px' }}>
//             <Button onClick={handleMapClick} color="primary" startIcon={<AddLocation sx={{ color: 'red' }} />}>
//               Maps
//             </Button>
//           </Box>
//         </Box>

//         <SearchPage />
//       </Card>

//       <Footer />
//     </Box>
//   );
// };

// export default HomePage;


"use client"; // This enables client-side rendering

import React from 'react';
import { Box, Button, Card, CardMedia, Typography } from '@mui/material';
import SearchPage from '@/components/searchbar/page';
import { AddLocation } from '@mui/icons-material';
import { useRouter } from 'next/navigation';
import Footer from './ffooter/page';
import Head from 'next/head';

const HomePage = () => {
  const router = useRouter(); // Initialize the router

  const handleMapClick = () => {
    router.push('/googlemap'); // Navigate to GoogleMapPage
  };

  return (
    <>
      <Head>
        <title>PC Electricals and Electronics - Your One-Stop Shop in Nakuru</title>
        <meta name="description" content="PC Electricals and Electronics offers a wide range of high-quality electricals and electronics. Shop now to find the best deals and products in Nakuru." />
        <meta property="og:title" content="PC Electricals and Electronics" />
        <meta property="og:description" content="Your one-stop shop for electricals and electronics in Nakuru." />
        <meta property="og:image" content="https://th.bing.com/th/id/OIP.TDa1Z27ZLtQZ9hKnLzbadgHaIb?w=167&h=190&c=7&r=0&o=5&pid=1.7" />
        <meta property="og:url" content="https://rockpcelectricals-g3da.vercel.app/" />
        <meta property="og:site_name" content="PC Electricals and Electronics" />
        <meta property="og:locale" content="en_KE" />

        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Organization",
              "name": "PC Electricals and Electronics",
              "url": "https://rockpcelectricals-g3da.vercel.app/",
              "logo": "https://th.bing.com/th/id/OIP.TDa1Z27ZLtQZ9hKnLzbadgHaIb?w=167&h=190&c=7&r=0&o=5&pid=1.7",
              "description": "PC Electricals and Electronics offers a wide range of high-quality electricals and electronics in Nakuru.",
              "contactPoint": {
                "@type": "ContactPoint",
                "telephone": "+254-700000000",
                "contactType": "Customer Service"
              }
            })
          }}
        />
      </Head>

      <Box>
        <Card>
          <CardMedia
            component="img"
            sx={{ height: { xs: 95, sm: 150 } }}
            image="https://images.pexels.com/photos/301792/pexels-photo-301792.jpeg?auto=compress&cs=tinysrgb&w=600"
            title="Electronic Products"
            alt="Electronic Products Display"
          />
          <Box
            sx={{
              position: 'absolute',
              top: '10.5%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
              color: 'white',
              textAlign: 'center',
              fontWeight: 'bold',
              fontSize: { xs: '1.2rem', sm: '1.5rem' },
              backgroundColor: 'rgba(0, 0, 0, 0.3)',
              padding: '2px',
              borderRadius: '8px',
              width: { xs: '95%', sm: '95%', md: '98.2%' }, // Responsive width
              display: 'flex',
              flexDirection: 'column', // Stack items vertically
              alignItems: 'center', // Center align items
            }}
          >
            <Typography variant='h4' sx={{ marginTop: '10%' }}>
              PC Electricals And Electronics
            </Typography>
            <Box sx={{ width: '100%', display: 'flex', justifyContent: 'flex-end', padding: '0 10px' }}>
              {/* <Button onClick={handleMapClick} color="primary" startIcon={<AddLocation sx={{ color: 'red' }} />}>
                Maps
              </Button> */}
            </Box>
          </Box>

          <SearchPage />
        </Card>

        <Footer />
      </Box>
    </>
  );
};

export default HomePage;
