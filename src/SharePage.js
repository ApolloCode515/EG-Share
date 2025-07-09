import React, { useState, useEffect } from 'react';
import './SharePage.css';
import { FaWhatsapp, FaUserCircle, FaStar, FaRegStar, FaPen, FaClock } from 'react-icons/fa';
import FeedbackDialog from './FeedbackDialog';

function SharePage() {
    const [progress, setProgress] = useState(0);
    const [shareCount, setShareCount] = useState(0);
    const [showCongrats, setShowCongrats] = useState(false);
    const [reviews, setReviews] = useState([]);
    const [newReview, setNewReview] = useState({ name: '', text: '', rating: 5 });
    const [showReviewForm, setShowReviewForm] = useState(false);
    const [timeLeft, setTimeLeft] = useState(600); // 2 hours in seconds
    const [showDialog, setShowDialog] = useState(false);

    useEffect(() => {
        const feedbackCompleted = localStorage.getItem('feedbackCompleted');
        if (!feedbackCompleted) {
            setShowDialog(true); // लगेचच उघडा
        }
    }, []);


    const handleCloseDialog = () => {
        setShowDialog(false);
        localStorage.setItem('feedbackCompleted', 'true');
    };

    useEffect(() => {
        const savedReviews = localStorage.getItem('appReviews');
        if (savedReviews) {
            setReviews(JSON.parse(savedReviews));
        }
        else {
            // Default reviews if no saved reviews are found
            const defaultReviews = [
                {
                    id: 1,
                    name: 'राहुल पाटील',
                    text: 'एक्सपर्ट गुरुजी ॲप खूपच छान आहे! वापरण्यास सोपे आणि वैशिष्ट्ये अप्रतिम आहेत. विशेषतः हजेरी आणि गुण नोंदीचे वैशिष्ट्य खूपच उपयुक्त आहे.',
                    rating: 5,
                    time: '२ तासांपूर्वी'
                },
                {
                    id: 2,
                    name: 'प्रिया देशमुख',
                    text: 'माझ्या सर्व मित्रांना याची शिफारस करते. ग्राहक समर्थन उत्कृष्ट आहे आणि अहवाल निर्मिती खूप सोपी झाली आहे.',
                    rating: 4,
                    time: '१ आठवड्यापूर्वी'
                },
                {
                    id: 3,
                    name: 'विकास जाधव',
                    text: 'पैसे वसूल ॲप. मोफत चाचणीमुळे मी प्रीमियम आवृत्ती खरेदी केली. आयडी कार्ड आणि बोनाफाईड तयार करणे आता खूप सोपे झाले आहे.',
                    rating: 5,
                    time: '३ दिवसांपूर्वी'
                },
                {
                    id: 4,
                    name: 'अंजली कुलकर्णी',
                    text: 'शाळेतील व्यवस्थापनासाठी हे ॲप वरदान आहे. सर्व कामे एकाच ठिकाणी होतात.',
                    rating: 5,
                    time: 'आज'
                },
                {
                    id: 5,
                    name: 'सुरेश शिंदे',
                    text: 'शिक्षक म्हणून, मला विद्यार्थ्यांचे गुण नोंदवणे आणि अहवाल तयार करणे खूप सोपे झाले आहे. वेळ वाचतो!',
                    rating: 5,
                    time: 'काल'
                },
                {
                    id: 6,
                    name: 'मीनाक्षी जोशी',
                    text: 'हजेरी घेण्याची पद्धत खूपच सोयीस्कर आहे. आता कागदाची गरज नाही.',
                    rating: 4,
                    time: '५ दिवसांपूर्वी'
                },
                {
                    id: 7,
                    name: 'राजेश पवार',
                    text: 'पालकांना विद्यार्थ्यांच्या प्रगतीचा अहवाल त्वरित मिळतो, हे खूप चांगले आहे.',
                    rating: 5,
                    time: '१ महिन्यापूर्वी'
                },
                {
                    id: 8,
                    name: 'सारिका भोसले',
                    text: 'ॲपचा इंटरफेस खूपच स्वच्छ आणि वापरकर्ता अनुकूल आहे. नवीन शिक्षकांसाठीही सोपे आहे.',
                    rating: 4,
                    time: '२ आठवड्यांपूर्वी'
                },
                {
                    id: 9,
                    name: 'नितीन गायकवाड',
                    text: 'बोनाफाईड आणि इतर कागदपत्रे तयार करणे आता काही मिनिटांचे काम आहे. खूपच प्रभावी!',
                    rating: 5,
                    time: '४ दिवसांपूर्वी'
                },
                {
                    id: 10,
                    name: 'कविता मोरे',
                    text: 'विद्यार्थ्यांचे आयडी कार्ड तयार करण्याची प्रक्रिया खूपच जलद आणि सोपी आहे.',
                    rating: 5,
                    time: '६ दिवसांपूर्वी'
                },
                {
                    id: 11,
                    name: 'अमोल देसाई',
                    text: 'शाळेच्या व्यवस्थापनासाठी हे एक परिपूर्ण समाधान आहे. सर्व वैशिष्ट्ये उत्तम काम करतात.',
                    rating: 5,
                    time: '३ आठवड्यांपूर्वी'
                },
                {
                    id: 12,
                    name: 'पूजा साळुंके',
                    text: 'मला हे ॲप खूप आवडले. गुण नोंदीची सुविधा विशेषतः खूप उपयुक्त आहे.',
                    rating: 4,
                    time: '१ आठवड्यापूर्वी'
                },
                {
                    id: 13,
                    name: 'गणेश कदम',
                    text: 'विद्यार्थ्यांच्या हजेरीचा मागोवा ठेवणे आता खूपच सोपे झाले आहे.',
                    rating: 5,
                    time: '८ दिवसांपूर्वी'
                },
                {
                    id: 14,
                    name: 'श्वेता शिंदे',
                    text: 'अहवाल निर्मितीची प्रक्रिया खूपच सुलभ आहे. मला खूप मदत झाली.',
                    rating: 5,
                    time: '२ महिन्यांपूर्वी'
                },
                {
                    id: 15,
                    name: 'प्रशांत कोळी',
                    text: 'आयडी कार्ड तयार करण्याची सुविधा खूपच चांगली आहे. वेळेची बचत होते.',
                    rating: 4,
                    time: '१२ दिवसांपूर्वी'
                },
                {
                    id: 16,
                    name: 'रश्मी पाटील',
                    text: 'बोनाफाईडसाठी आता लांब रांगेत उभे राहावे लागत नाही. ॲपमुळे खूप सोपे झाले.',
                    rating: 5,
                    time: '९ दिवसांपूर्वी'
                },
                {
                    id: 17,
                    name: 'संजय कुलकर्णी',
                    text: 'शिक्षक आणि विद्यार्थ्यांसाठी हे एक उत्तम ॲप आहे. सर्व गरजा पूर्ण होतात.',
                    rating: 5,
                    time: '५ आठवड्यांपूर्वी'
                },
                {
                    id: 18,
                    name: 'दीपा पवार',
                    text: 'गुण नोंदीची अचूकता खूप चांगली आहे. चुका होण्याची शक्यता कमी झाली आहे.',
                    rating: 4,
                    time: '११ दिवसांपूर्वी'
                },
                {
                    id: 19,
                    name: 'मोहन जाधव',
                    text: 'ॲपमुळे शाळेचे व्यवस्थापन खूपच कार्यक्षम झाले आहे.',
                    rating: 5,
                    time: '१५ दिवसांपूर्वी'
                },
                {
                    id: 20,
                    name: 'अदिती देशमुख',
                    text: 'हजेरी आणि अहवाल दोन्हीसाठी हे ॲप खूपच प्रभावी आहे.',
                    rating: 5,
                    time: '३ आठवड्यांपूर्वी'
                },
                {
                    id: 21,
                    name: 'विजय मोरे',
                    text: 'मला हे ॲप खूप आवडले. सर्व वैशिष्ट्ये खूप उपयुक्त आहेत.',
                    rating: 4,
                    time: '७ दिवसांपूर्वी'
                },
                {
                    id: 22,
                    name: 'स्नेहा कुलकर्णी',
                    text: 'बोनाफाईड आणि आयडी कार्ड तयार करणे खूपच सोपे झाले आहे.',
                    rating: 5,
                    time: '४ आठवड्यांपूर्वी'
                },
                {
                    id: 23,
                    name: 'रोहित शिंदे',
                    text: 'गुण नोंदीसाठी हे ॲप एक उत्तम साधन आहे. खूपच सोपे आणि जलद.',
                    rating: 5,
                    time: '१० दिवसांपूर्वी'
                },
                {
                    id: 24,
                    name: 'प्रज्ञा जोशी',
                    text: 'ॲपमुळे शाळेतील कामांचा ताण कमी झाला आहे.',
                    rating: 4,
                    time: '६ आठवड्यांपूर्वी'
                },
                {
                    id: 25,
                    name: 'दिलीप पाटील',
                    text: 'हजेरी व्यवस्थापन आणि अहवाल निर्मितीसाठी हे ॲप खूपच उपयुक्त आहे.',
                    rating: 5,
                    time: '२ दिवसांपूर्वी'
                },
                {
                    id: 26,
                    name: 'शर्मिला देसाई',
                    text: 'विद्यार्थ्यांच्या प्रगतीचा मागोवा ठेवण्यासाठी हे ॲप खूप मदत करते.',
                    rating: 5,
                    time: '१ महिन्यापूर्वी'
                },
                {
                    id: 27,
                    name: 'आकाश गायकवाड',
                    text: 'आयडी कार्ड आणि बोनाफाईड तयार करणे आता खूपच सोपे झाले आहे.',
                    rating: 4,
                    time: '१३ दिवसांपूर्वी'
                },
                {
                    id: 28,
                    name: 'पल्लवी कदम',
                    text: 'हे ॲप वापरण्यास खूप सोपे आहे आणि त्याचे फायदे खूप आहेत.',
                    rating: 5,
                    time: '५ दिवसांपूर्वी'
                },
                {
                    id: 29,
                    name: 'किरण पवार',
                    text: 'शिक्षक आणि व्यवस्थापनासाठी हे एक आदर्श ॲप आहे.',
                    rating: 5,
                    time: '२ आठवड्यांपूर्वी'
                },
                {
                    id: 30,
                    name: 'मंजिरी भोसले',
                    text: 'गुण नोंदी आणि अहवाल तयार करणे आता खूपच जलद होते.',
                    rating: 4,
                    time: '८ दिवसांपूर्वी'
                },
                {
                    id: 31,
                    name: 'सुनील राणे',
                    text: 'हजेरी व्यवस्थापन खूपच प्रभावी आहे. ॲपमुळे वेळ वाचतो.',
                    rating: 5,
                    time: '३ दिवसांपूर्वी'
                },
                {
                    id: 32,
                    name: 'प्रतीक्षा कुलकर्णी',
                    text: 'विद्यार्थ्यांच्या माहितीचे व्यवस्थापन खूपच सोपे झाले आहे.',
                    rating: 5,
                    time: '४ महिन्यांपूर्वी'
                },
                {
                    id: 33,
                    name: 'ओमकार शिंदे',
                    text: 'आयडी कार्ड आणि बोनाफाईडची प्रक्रिया खूपच सुलभ आहे.',
                    rating: 4,
                    time: '१ महिन्यापूर्वी'
                },
                {
                    id: 34,
                    name: 'रेवती जोशी',
                    text: 'हे ॲप शाळेतील सर्व गरजा पूर्ण करते. खूपच उपयुक्त.',
                    rating: 5,
                    time: '६ दिवसांपूर्वी'
                },
                {
                    id: 35,
                    name: 'सिद्धार्थ पाटील',
                    text: 'गुण नोंदी आणि अहवाल निर्मितीसाठी हे ॲप खूपच चांगले आहे.',
                    rating: 5,
                    time: '११ दिवसांपूर्वी'
                },
                {
                    id: 36,
                    name: 'श्रद्धा देशमुख',
                    text: 'ॲप वापरण्यास खूप सोपे आहे आणि त्याचे फायदे खूप आहेत.',
                    rating: 4,
                    time: '२ आठवड्यांपूर्वी'
                },
                {
                    id: 37,
                    name: 'अभिजीत जाधव',
                    text: 'हजेरी व्यवस्थापन आणि अहवाल निर्मितीसाठी हे ॲप खूपच उपयुक्त आहे.',
                    rating: 5,
                    time: '५ दिवसांपूर्वी'
                },
                {
                    id: 38,
                    name: 'ईशा कुलकर्णी',
                    text: 'माझ्या सर्व मित्रांना याची शिफारस करते. ग्राहक समर्थन उत्कृष्ट आहे.',
                    rating: 5,
                    time: '३ महिन्यांपूर्वी'
                },
                {
                    id: 39,
                    name: 'सौरभ पवार',
                    text: 'बोनाफाईड आणि इतर कागदपत्रे तयार करणे आता खूप सोपे झाले आहे.',
                    rating: 4,
                    time: '९ दिवसांपूर्वी'
                },
                {
                    id: 40,
                    name: 'अवंतिका मोरे',
                    text: 'विद्यार्थ्यांचे आयडी कार्ड तयार करण्याची प्रक्रिया खूपच जलद आणि सोपी आहे.',
                    rating: 5,
                    time: '७ दिवसांपूर्वी'
                },
                {
                    id: 41,
                    name: 'प्रणव देसाई',
                    text: 'शाळेच्या व्यवस्थापनासाठी हे एक परिपूर्ण समाधान आहे. सर्व वैशिष्ट्ये उत्तम काम करतात.',
                    rating: 5,
                    time: '१ आठवड्यापूर्वी'
                },
                {
                    id: 42,
                    name: 'मानसी साळुंके',
                    text: 'मला हे ॲप खूप आवडले. गुण नोंदीची सुविधा विशेषतः खूप उपयुक्त आहे.',
                    rating: 4,
                    time: '१४ दिवसांपूर्वी'
                },
                {
                    id: 43,
                    name: 'वरुण कदम',
                    text: 'विद्यार्थ्यांच्या हजेरीचा मागोवा ठेवणे आता खूपच सोपे झाले आहे.',
                    rating: 5,
                    time: '६ दिवसांपूर्वी'
                },
                {
                    id: 44,
                    name: 'रिया शिंदे',
                    text: 'अहवाल निर्मितीची प्रक्रिया खूपच सुलभ आहे. मला खूप मदत झाली.',
                    rating: 5,
                    time: '२ आठवड्यांपूर्वी'
                },
                {
                    id: 45,
                    name: 'अर्णव कोळी',
                    text: 'आयडी कार्ड तयार करण्याची सुविधा खूपच चांगली आहे. वेळेची बचत होते.',
                    rating: 4,
                    time: '१० दिवसांपूर्वी'
                },
                {
                    id: 46,
                    name: 'सानिका पाटील',
                    text: 'बोनाफाईडसाठी आता लांब रांगेत उभे राहावे लागत नाही. ॲपमुळे खूप सोपे झाले.',
                    rating: 5,
                    time: '८ दिवसांपूर्वी'
                },
                {
                    id: 47,
                    name: 'अर्जुन कुलकर्णी',
                    text: 'शिक्षक आणि विद्यार्थ्यांसाठी हे एक उत्तम ॲप आहे. सर्व गरजा पूर्ण होतात.',
                    rating: 5,
                    time: '३ आठवड्यांपूर्वी'
                },
                {
                    id: 48,
                    name: 'तेजस्विनी पवार',
                    text: 'गुण नोंदीची अचूकता खूप चांगली आहे. चुका होण्याची शक्यता कमी झाली आहे.',
                    rating: 4,
                    time: '१२ दिवसांपूर्वी'
                },
                {
                    id: 49,
                    name: 'आदित्य जाधव',
                    text: 'ॲपमुळे शाळेचे व्यवस्थापन खूपच कार्यक्षम झाले आहे.',
                    rating: 5,
                    time: '१६ दिवसांपूर्वी'
                },
                {
                    id: 50,
                    name: 'प्राची देशमुख',
                    text: 'हजेरी आणि अहवाल दोन्हीसाठी हे ॲप खूपच प्रभावी आहे.',
                    rating: 5,
                    time: '४ आठवड्यांपूर्वी'
                },
                {
                    id: 51,
                    name: 'ओम मोरे',
                    text: 'मला हे ॲप खूप आवडले. सर्व वैशिष्ट्ये खूप उपयुक्त आहेत.',
                    rating: 4,
                    time: '९ दिवसांपूर्वी'
                },
                {
                    id: 52,
                    name: 'श्रेया कुलकर्णी',
                    text: 'बोनाफाईड आणि आयडी कार्ड तयार करणे खूपच सोपे झाले आहे.',
                    rating: 5,
                    time: '५ आठवड्यांपूर्वी'
                },
                {
                    id: 53,
                    name: 'कुणाल शिंदे',
                    text: 'गुण नोंदीसाठी हे ॲप एक उत्तम साधन आहे. खूपच सोपे आणि जलद.',
                    rating: 5,
                    time: '११ दिवसांपूर्वी'
                },
                {
                    id: 54,
                    name: 'अनुष्का जोशी',
                    text: 'ॲपमुळे शाळेतील कामांचा ताण कमी झाला आहे.',
                    rating: 4,
                    time: '७ आठवड्यांपूर्वी'
                }
            ];
            setReviews(defaultReviews);
            localStorage.setItem('appReviews', JSON.stringify(defaultReviews));
        }
    }, []);

    // Countdown timer effect
    useEffect(() => {
        if (timeLeft <= 0) return;

        const timerId = setInterval(() => {
            setTimeLeft(prevTime => prevTime - 1);
        }, 1000);

        return () => clearInterval(timerId);
    }, [timeLeft]);

    const formatTime = (seconds) => {
        const hours = Math.floor(seconds / 3600);
        const minutes = Math.floor((seconds % 3600) / 60);
        const secs = seconds % 60;

        return [
            hours.toString().padStart(2, '0'),
            minutes.toString().padStart(2, '0'),
            secs.toString().padStart(2, '0')
        ].join(':');
    };

    useEffect(() => {
        if (reviews.length > 0) {
            localStorage.setItem('appReviews', JSON.stringify(reviews));
        }
    }, [reviews]);

    const handleShare = () => {
        const newCount = shareCount + 1;

        // Delay the progress update by 10 seconds (10000 ms)
        setTimeout(() => {
            setShareCount(newCount);

            // Set progress logic
            if (newCount === 1) {
                setProgress(60); // First share = 60%
            } else {
                setProgress(prev => {
                    const updated = prev + 10;
                    return updated > 100 ? 100 : updated;
                });
            }

            if (newCount >= 5) {
                setShowCongrats(true);
            }
        }, 5000);

        // Prepare YouTube link based on time
        const youtubeLinks = [
            "https://youtu.be/DpoitsWwjuA",
            "https://youtu.be/EyNFNnepmbY",
            "https://youtu.be/tYZV64P7QW4",
            "https://youtu.be/Xs0p-d91lHA",
            "https://youtu.be/wCajD-7ysKM",
            "https://youtu.be/ooqx3VRAUWE?si=5Vtao_nidPywsAcr"
        ];

        const currentHour = new Date().getHours();
        const linkIndex = Math.floor(currentHour / 3) % youtubeLinks.length;
        const videoLink = youtubeLinks[linkIndex];
        const appDownloadUrl = "https://eg-share.vercel.app/";

        // Prepare WhatsApp share message
        const shareText = `🚀 नवीन शैक्षणिक धोरणानुसार... आता शाळा होईल स्मार्ट!

शालेय कामकाज आता पारंपरिक नाही — स्मार्ट तंत्रज्ञानासोबत पुढे जा!

💡 अ‍ॅपमधील वैशिष्ट्ये:
📝 *AI आधारित हजेरी (कॅटलॉग)*: विद्यार्थ्यांची हजेरी आता एका क्लिकमध्ये
📊 *१ ली ते १२ वीचे निकालपत्र*: डिजिटल आणि व्यवस्थित स्वरूपात
🏠 *मोफत गृहपाठ अ‍ॅप*: सर्व वर्गासाठी उपयुक्त
🎂 *वाढदिवस शुभेच्छा*: विद्यार्थ्यांना आकर्षक ग्रिटींग्स पाठवा
📄 *बोनाफाइड सर्टिफिकेट*: क्षणात तयार
📔 *शिक्षक टाचण वही*: एकत्रित आणि व्यवस्थीत रेकॉर्ड
⏰ *वेळापत्रक*: सहज तयार करा आणि अपडेट ठेवा
🧑‍🎓 *विद्यार्थी ओळखपत्र*: प्रोफेशनल आणि मुद्रणास तयार
📝 *ऑनलाइन टेस्ट*: विद्यार्थ्यांसाठी टेस्ट घ्या आणि निकाल पहा
🌐 *शाळेची वेबसाईट*: आधुनिक डिजिटलीकरणाची सुरूवात

📽️ *डेमो व्हिडिओ पाहा:* ${videoLink}

📲 *अॅप डाउनलोड करा:* ${appDownloadUrl}`;

        const shareUrl = `https://wa.me/?text=${encodeURIComponent(shareText)}`;
        window.open(shareUrl, '_blank');
    };




    const handleReviewSubmit = (e) => {
        e.preventDefault();
        if (newReview.name.trim() && newReview.text.trim()) {
            const review = {
                id: Date.now(),
                name: newReview.name,
                text: newReview.text,
                rating: newReview.rating,
                time: 'आता'
            };
            setReviews([review, ...reviews]);
            setNewReview({ name: '', text: '', rating: 5 });
            setShowReviewForm(false);
        }
    };

    const renderStars = (rating) => {
        return Array.from({ length: 5 }, (_, i) => (
            <span key={i + 1}>
                {i + 1 <= rating ? (
                    <FaStar className="star filled" />
                ) : (
                    <FaRegStar className="star" />
                )}
            </span>
        ));
    };

    // Add this to your JSX where you want to display the countdown timer
    const countdownTimer = (
        <div style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            gap: '8px',
            marginTop: '10px'
        }}>
            <div style={{
                display: 'inline-flex',
                alignItems: 'center',
                background: timeLeft > 0 ? 'rgba(220, 38, 38, 0.1)' : 'rgba(107, 114, 128, 0.1)',
                borderRadius: '16px',
                padding: '4px 12px'
            }}>
                <FaClock style={{
                    marginRight: '6px',
                    color: timeLeft > 0 ? '#dc2626' : '#6b7280'
                }} />
                <span style={{
                    color: timeLeft > 0 ? '#dc2626' : '#6b7280',
                    fontWeight: '600',
                    fontSize: '0.9rem'
                }}>
                    {timeLeft > 0 ? `ऑफर संपत आहे: ${formatTime(timeLeft)}` : 'ऑफर समाप्त!'}
                </span>
            </div>
        </div>
    );

    return (

        <div> {showDialog && <FeedbackDialog onClose={handleCloseDialog} />}

            <div className="share-page" style={{
                fontFamily: "'Poppins', sans-serif",
                background: 'linear-gradient(135deg, #1e3a8a, #3b82f6)',
                minHeight: '100vh',
                color: '#ffffff'
            }}>



                {!showCongrats ? (
                    <div className="share-container" style={{
                        maxWidth: '800px',
                        borderBottomLeftRadius: '20px',
                        borderBottomRightRadius: '20px',
                        margin: '0 auto',
                        background: 'rgba(255, 255, 255, 0.95)',
                        // borderRadius: '20px',
                        padding: '10px',
                        boxShadow: '0 8px 20px rgba(0, 0, 0, 0.3)',
                        marginBottom: '30px'
                    }}>
                        <div style={{
                            textAlign: 'center',
                            margin: '25px 0',
                            position: 'relative'
                        }}>
                            <h1 className="page-title" style={{
                                fontSize: '1.6rem',
                                // background: 'linear-gradient(to right, #1e3a8a, #3b82f6, #1e3a8a)',
                                WebkitBackgroundClip: 'text',
                                backgroundClip: 'text',
                                color: '#1e3a8a',
                                paddingTop: '10px',
                                width: '100%',
                                margin: '0 auto 5px auto',
                                fontWeight: '700',
                                letterSpacing: '0.5px',
                                textShadow: '0 2px 8px rgba(30, 58, 138, 0.2)',
                                display: 'inline-block',
                                padding: '0px',
                                position: 'relative'
                            }}>
                                एक्सपर्ट गुरुजी
                                <span style={{
                                    position: 'absolute',
                                    bottom: '-5px',
                                    left: '20%',
                                    width: '60%',
                                    height: '3px',
                                    background: 'linear-gradient(to right, transparent, #3b82f6, transparent)',
                                    borderRadius: '3px'
                                }}></span>
                            </h1>
                            {countdownTimer}

                        </div>
                        <h1 className="page-title" style={{
                            fontSize: '1.5rem',
                            color: '#1e3a8a',
                            marginTop: '-10px',
                            textAlign: 'center',
                            marginBottom: '12px',
                            fontWeight: '800',
                            textTransform: 'uppercase',
                            letterSpacing: '1px',
                            fontFamily: "'Poppins', sans-serif",
                            textShadow: '1px 1px 6px rgba(30, 58, 138, 0.3)'
                        }}>
                            रेफर करा आणि मिळवा!
                        </h1>

                        <p className="page-subtitle" style={{
                            fontSize: '1.05rem',
                            color: '#374151',
                            textAlign: 'center',
                            marginBottom: '28px',
                            padding: '0 20px',
                            lineHeight: '1.6',
                            fontWeight: '500',
                            fontFamily: "'Poppins', sans-serif"
                        }}>
                            <span style={{ color: '#3b82f6', fontWeight: '600' }}>तुमच्या मित्रांसोबत शेअर करा</span> आणि <span style={{ color: '#10b981', fontWeight: '600' }}>रोमांचक बक्षिसे मिळवा!</span> 🎁
                        </p>


                        <div className="progress-container" style={{
                            margin: '20px 0',
                            padding: '15px',
                            borderRadius: '12px',
                            background: 'linear-gradient(145deg, #f8fafc, #f1f5f9)',
                            boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)'
                        }}>
                            <div className="progress-info" style={{
                                display: 'flex',
                                justifyContent: 'space-between',
                                marginBottom: '12px',
                                fontWeight: 'bold',
                                color: '#1e3a8a',
                                fontSize: '16px',
                                textShadow: '0 1px 2px rgba(255, 255, 255, 0.7)'
                            }}>
                                <span className="progress-text" style={{
                                    padding: '4px 10px',
                                    borderRadius: '20px',
                                    background: 'rgba(30, 64, 175, 0.1)'
                                }}>प्रगती: {progress}%</span>
                                <span className="share-count" style={{
                                    padding: '4px 10px',
                                    borderRadius: '20px',
                                    background: 'rgba(30, 64, 175, 0.1)'
                                }}>{shareCount}/5 शेअर्स</span>
                            </div>
                            <div className="progress" style={{
                                height: '28px',
                                background: '#e2e8f0',
                                borderRadius: '14px',
                                overflow: 'hidden',
                                position: 'relative',
                                boxShadow: 'inset 0 2px 4px 0 rgba(0, 0, 0, 0.1)'
                            }}>
                                <div
                                    className="progress-bar"
                                    role="progressbar"
                                    style={{
                                        width: `${progress}%`,
                                        height: '100%',
                                        // background: 'linear-gradient(90deg, #001f3f, #003366)',
                                        transition: 'width 0.5s ease-in-out, box-shadow 0.3s ease',
                                        // backgroundImage: 'linear-gradient(45deg, rgba(255, 255, 255, 0.3) 25%, transparent 25%, transparent 50%, rgba(255, 255, 255, 0.3) 50%, rgba(255, 255, 255, 0.3) 75%, transparent 75%)',
                                        backgroundSize: '30px 30px',
                                        animation: 'move 2s linear infinite',
                                        borderRadius: '14px',
                                        boxShadow: '0 2px 8px rgba(0, 63, 127, 0.6)',
                                        position: 'relative',
                                        overflow: 'hidden'
                                    }}
                                    aria-valuenow={progress}
                                    aria-valuemin="0"
                                    aria-valuemax="100"
                                >
                                    <div style={{
                                        position: 'absolute',
                                        right: '0',
                                        top: '0',
                                        height: '100%',
                                        width: '10px',
                                        background: 'rgba(255, 255, 255, 0.4)',
                                        transform: 'skewX(-20deg)',
                                        filter: 'blur(3px)'
                                    }}></div>
                                </div>
                                {progress > 0 && (
                                    <span style={{
                                        position: 'absolute',
                                        left: '10px',
                                        top: '50%',
                                        transform: 'translateY(-50%)',
                                        color: progress < 50 ? '#001f3f' : 'white', // Navy blue when progress < 50%, white when >= 50%
                                        fontWeight: 'bold',
                                        fontSize: '14px',
                                        textShadow: progress < 50 ? '0 1px 2px rgba(255, 255, 255, 0.7)' : '0 1px 2px rgba(0, 0, 0, 0.5)',
                                        zIndex: 2,
                                        padding: '0 8px',
                                        borderRadius: '10px',
                                        background: progress < 50 ? 'rgba(255, 255, 255, 0.4)' : 'transparent'
                                    }}>{progress}%</span>
                                )}
                            </div>
                            <style>{`
        @keyframes move {
            0% { background-position: 0 0; }
            100% { background-position: 30px 30px; }
        }
    `}</style>
                        </div>

                        <div className="share-card" style={{
                            background: '#ffffff',
                            borderRadius: '15px',
                            padding: '25px',
                            textAlign: 'center',
                            boxShadow: '0 6px 15px rgba(0, 0, 0, 0.2)',
                            margin: '20px 0'
                        }}>
                            <div className="share-message">
                                <p style={{
                                    fontSize: '1rem',
                                    fontWeight: 'bold',
                                    color: '#1e3a8a',
                                    margin: '10px 0'
                                }}>
                                    🌟 एक्सपर्ट गुरुजी शेअर करा आणि अनलॉक करा विशेष ऑफर्स!
                                </p>
                                <p style={{
                                    fontSize: '0.9rem',
                                    color: '#1f2937',
                                    margin: '10px 0'
                                }}>
                                    ५ शेअर्स पूर्ण करा आणि मिळवा <strong>३ महिन्यांचा मोफत प्रीमियम प्लॅन</strong>!
                                </p>
                                <p style={{
                                    background: '#e0f2fe',
                                    padding: '10px',
                                    borderRadius: '8px',
                                    fontSize: '0.9rem',
                                    color: '#1e40af',
                                    fontWeight: 'bold',
                                    margin: '10px 0'
                                }}>
                                    🎁 पहिल्या शेअरवर १ महिन्याचा मोफत वापर + विशेष डिस्काउंट कोड!
                                </p>
                                <p style={{
                                    background: '#dbeafe',
                                    padding: '10px',
                                    borderRadius: '8px',
                                    color: '#1e40af',
                                    fontSize: '0.9rem',
                                    fontWeight: 'bold',
                                    margin: '10px 0'
                                }}>
                                    🎉 ३ शेअर्सवर २ महिन्यांचा प्रीमियम प्लॅन + एक्सक्लुझिव्ह व्हाउचर!
                                </p>
                            </div>

                            <button
                                className="btn share-button"
                                onClick={handleShare}
                                style={{
                                    // display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    background: 'linear-gradient(90deg, #25D366, #128C7E)',
                                    color: 'white',
                                    border: 'none',
                                    padding: '12px 25px',
                                    borderRadius: '25px',
                                    fontSize: '1.1rem',
                                    cursor: 'pointer',
                                    transition: 'transform 0.3s, box-shadow 0.3s',
                                    marginTop: '15px',
                                    boxShadow: '0 4px 8px rgba(0,0,0,0.2)'
                                }}
                                onMouseOver={e => {
                                    e.currentTarget.style.transform = 'scale(1.05)';
                                    e.currentTarget.style.boxShadow = '0 6px 12px rgba(0,0,0,0.3)';
                                }}
                                onMouseOut={e => {
                                    e.currentTarget.style.transform = 'scale(1)';
                                    e.currentTarget.style.boxShadow = '0 4px 8px rgba(0,0,0,0.2)';
                                }}
                            >
                                <FaWhatsapp style={{ marginRight: '8px', fontSize: '1.4rem' }} />
                                व्हॉट्सअपवर शेअर करा
                            </button>
                        </div>

                        <div className="rewards-info" style={{
                            marginTop: '20px',
                            textAlign: 'center'
                        }}>
                            <h3 style={{
                                ektir: '1.5rem',
                                color: '#1e3a8a',
                                marginBottom: '15px'
                            }}>
                                तुमची बक्षिसे:
                            </h3>
                            <ul style={{
                                listStyle: 'none',
                                padding: '0'
                            }}>
                                <li style={{
                                    fontSize: '0.9rem',
                                    color: shareCount >= 1 ? '#34d399' : '#bfdbfe',
                                    margin: '10px 0',
                                    fontWeight: shareCount >= 1 ? 'bold' : 'normal'
                                }}>
                                    {shareCount >= 1 && '✔ '}१ शेअर: १ महिन्याचा मोफत वापर + डिस्काउंट कोड
                                </li>
                                <li style={{
                                    fontSize: '0.9rem',
                                    color: shareCount >= 3 ? '#34d399' : '#bfdbfe',
                                    margin: '10px 0',
                                    fontWeight: shareCount >= 3 ? 'bold' : 'normal'
                                }}>
                                    {shareCount >= 3 && '✔ '}३ शेअर्स: २ महिन्यांचा प्रीमियम प्लॅन + व्हाउचर
                                </li>
                                <li style={{
                                    fontSize: '0.9rem',
                                    color: shareCount >= 5 ? '#34d399' : '#bfdbfe',
                                    margin: '10px 0',
                                    fontWeight: shareCount >= 5 ? 'bold' : 'normal'
                                }}>
                                    {shareCount >= 5 && '✔ '}५ शेअर्स: ३ महिन्यांचा प्रीमियम प्लॅन + विशेष बोनस
                                </li>
                            </ul>
                        </div>
                    </div>
                ) : (
                    <div
                        className="congrats-container animate__animated animate__zoomIn"
                        style={{
                            maxWidth: '800px',
                            margin: '0 auto',
                            background: 'linear-gradient(135deg, #1e3a8a, #3b82f6)',
                            borderBottomLeftRadius: '20px',
                            borderBottomRightRadius: '20px',
                            marginBottom: '40px',
                            padding: '10px',
                            boxShadow: '0 8px 20px rgba(0, 0, 0, 0.3)',
                            fontFamily: "'Poppins', sans-serif",
                            color: '#ffffff',
                            textAlign: 'center',
                            position: 'relative',
                            overflow: 'hidden'
                        }}
                    >
                        <div className="congrats-card" style={{
                            position: 'relative',
                            background: 'linear-gradient(135deg, #1e3a8a 0%, #1e40af 100%)',
                            borderRadius: '24px',
                            boxShadow: '0 20px 40px rgba(0, 0, 0, 0.3)',
                            border: '1px solid rgba(255, 255, 255, 0.1)',
                            maxWidth: '600px',
                            margin: '0 auto',
                            overflow: 'hidden',
                            textAlign: 'center'
                        }}>
                            {/* Premium decorative elements */}
                            <div style={{
                                position: 'absolute',
                                top: 0,
                                left: 0,
                                right: 0,
                                height: '4px',
                                background: 'linear-gradient(90deg, #60a5fa, #3b82f6, #60a5fa)',
                                boxShadow: '0 0 10px rgba(96, 165, 250, 0.7)'
                            }}></div>

                            {/* Enhanced confetti */}
                            {[...Array(15)].map((_, i) => (
                                <div key={i} style={{
                                    position: 'absolute',
                                    width: `${Math.random() * 6 + 6}px`,
                                    height: `${Math.random() * 6 + 6}px`,
                                    background: `hsl(${Math.random() * 60 + 200}, 80%, ${Math.random() * 30 + 60}%)`,
                                    top: '-100px',
                                    left: `${Math.random() * 100}%`,
                                    animation: `confetti ${Math.random() * 2 + 3}s ease-in infinite`,
                                    opacity: 0.8,
                                    transform: `rotate(${Math.random() * 360}deg)`,
                                    borderRadius: ['50%', '0%'][Math.floor(Math.random() * 2)]
                                }}></div>
                            ))}

                            {/* Main content */}
                            <div style={{ position: 'relative', zIndex: 2 }}>
                                <h2 className="congrats-title" style={{
                                    fontSize: '2.2rem',
                                    color: '#ffffff',
                                    marginTop: '16px',
                                    paddingTop: '10px',
                                    margin: '0 0 25px 0',
                                    textShadow: '0 4px 8px rgba(0, 0, 0, 0.3)',
                                    fontWeight: '700',
                                    letterSpacing: '1px',
                                    background: 'linear-gradient(90deg, #ffffff, #e0f2fe)',
                                    WebkitBackgroundClip: 'text',
                                    backgroundClip: 'text',
                                    color: 'transparent',
                                    animation: 'pulse 1.5s infinite alternate'
                                }}>
                                    अभिनंदन!
                                </h2>

                                <div style={{
                                    background: 'rgba(255, 255, 255, 0.1)',
                                    padding: '10px',
                                    margin: '10px',
                                    borderRadius: '16px',
                                    backdropFilter: 'blur(5px)',
                                    marginBottom: '30px',
                                    border: '1px solid rgba(255, 255, 255, 0.15)'
                                }}>
                                    <p className="congrats-message" style={{
                                        fontSize: '1rem',
                                        color: '#ffffff',
                                        margin: '0',
                                        lineHeight: '1.6',
                                        fontWeight: '500'
                                    }}>
                                        तुम्ही <span style={{ color: '#fbbf24', fontWeight: '600' }}>३ महिन्यांचा मोफत प्रीमियम प्लॅन</span> आणि विशेष बोनस अनलॉक केला आहे!
                                    </p>
                                </div>

                                <div className="app-link" style={{
                                    marginBottom: '30px',
                                    padding: '20px',
                                    background: 'rgba(0, 0, 0, 0.2)',
                                    borderRadius: '16px'
                                }}>
                                    <p style={{
                                        fontSize: '1rem',
                                        color: '#e0f2fe',
                                        margin: '0 0 20px 0',
                                        fontWeight: '400'
                                    }}>
                                        आता <strong style={{ color: '#ffffff' }}>एक्सपर्ट गुरुजी ॲप</strong> डाउनलोड करा आणि तुमचे बक्षीस मिळवा:
                                    </p>
                                    <a
                                        href="https://expertguruji.com/download"
                                        className="btn download-button"
                                        style={{
                                            display: 'inline-block',
                                            background: 'linear-gradient(90deg, #1e40af, #3b82f6)',
                                            color: 'white',
                                            padding: '16px 35px',
                                            borderRadius: '50px',
                                            textDecoration: 'none',
                                            fontSize: '1.2rem',
                                            fontWeight: '600',
                                            transition: 'all 0.3s ease',
                                            boxShadow: '0 8px 20px rgba(30, 64, 175, 0.4)',
                                            border: '2px solid rgba(255, 255, 255, 0.2)',
                                            position: 'relative',
                                            overflow: 'hidden'
                                        }}
                                        onMouseOver={e => {
                                            e.currentTarget.style.transform = 'translateY(-3px)';
                                            e.currentTarget.style.boxShadow = '0 12px 25px rgba(30, 64, 175, 0.6)';
                                        }}
                                        onMouseOut={e => {
                                            e.currentTarget.style.transform = 'translateY(0)';
                                            e.currentTarget.style.boxShadow = '0 8px 20px rgba(30, 64, 175, 0.4)';
                                        }}
                                    >
                                        <span style={{ position: 'relative', zIndex: 2 }}>
                                            डाउनलोड करा आणि मोफत प्रीमियम मिळवा
                                        </span>
                                        <span style={{
                                            position: 'absolute',
                                            top: '-50%',
                                            left: '-50%',
                                            width: '200%',
                                            height: '200%',
                                            background: 'linear-gradient(90deg, rgba(255,255,255,0) 0%, rgba(255,255,255,0.2) 50%, rgba(255,255,255,0) 100%)',
                                            transform: 'rotate(30deg)',
                                            transition: 'all 0.6s ease',
                                            opacity: 0
                                        }} className="button-shine"></span>
                                    </a>
                                </div>

                                <div className="share-more" style={{
                                    padding: '20px',
                                    background: 'rgba(255, 255, 255, 0.05)',
                                    borderRadius: '16px'
                                }}>
                                    <p style={{
                                        fontSize: '1.1rem',
                                        color: '#bfdbfe',
                                        margin: '0 0 20px 0',
                                        fontWeight: '400'
                                    }}>
                                        आणखी बक्षिसे मिळवायची आहेत? पुन्हा शेअर करा!
                                    </p>
                                    <button
                                        className="btn share-button"
                                        onClick={handleShare}
                                        style={{
                                            display: 'inline-flex',
                                            alignItems: 'center',
                                            justifyContent: 'center',
                                            background: 'linear-gradient(90deg, #25D366, #128C7E)',
                                            color: 'white',
                                            border: 'none',
                                            padding: '16px 35px',
                                            borderRadius: '50px',
                                            fontSize: '1.2rem',
                                            fontWeight: '600',
                                            cursor: 'pointer',
                                            transition: 'all 0.3s ease',
                                            boxShadow: '0 8px 20px rgba(18, 140, 126, 0.4)',
                                            position: 'relative',
                                            overflow: 'hidden'
                                        }}
                                        onMouseOver={e => {
                                            e.currentTarget.style.transform = 'translateY(-3px)';
                                            e.currentTarget.style.boxShadow = '0 12px 25px rgba(18, 140, 126, 0.6)';
                                        }}
                                        onMouseOut={e => {
                                            e.currentTarget.style.transform = 'translateY(0)';
                                            e.currentTarget.style.boxShadow = '0 8px 20px rgba(18, 140, 126, 0.4)';
                                        }}
                                    >
                                        <FaWhatsapp style={{ marginRight: '12px', fontSize: '1.6rem' }} />
                                        पुन्हा शेअर करा
                                    </button>
                                </div>
                            </div>

                            <style>{`
        @keyframes confetti {
            0% { transform: translateY(0) rotate(0deg); opacity: 1; }
            100% { transform: translateY(600px) rotate(360deg); opacity: 0; }
        }
        @keyframes pulse {
            0% { transform: scale(1); opacity: 0.9; }
            100% { transform: scale(1.05); opacity: 1; }
        }
        .download-button:hover .button-shine {
            opacity: 1;
            left: 100%;
        }
    `}</style>
                        </div>
                    </div>
                )}

                <div className="reviews-section" style={{
                    maxWidth: '800px',
                    margin: '0 auto',
                    background: 'rgba(255, 255, 255, 0.95)',
                    borderTopLeftRadius: '20px',
                    borderTopRightRadius: '20px',
                    padding: '10px',
                    boxShadow: '0 8px 20px rgba(0, 0, 0, 0.3)',
                    marginBottom: '30px'
                }}>
                    <h2 className="section-title" style={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        fontSize: '1.5rem',
                        fontWeight: '600',
                        color: '#1e3a8a',
                        marginBottom: '20px'
                    }}>
                        टिप्पण्या
                        <button
                            className="btn add-review-btn"
                            onClick={() => setShowReviewForm(!showReviewForm)}
                            style={{
                                background: 'linear-gradient(90deg, #1e40af, #60a5fa)',
                                color: 'white',
                                border: 'none',
                                padding: '8px 15px',
                                borderRadius: '20px',
                                cursor: 'pointer',
                                display: 'flex',
                                alignItems: 'center',
                                transition: 'transform 0.3s'
                            }}
                            onMouseOver={e => e.currentTarget.style.transform = 'scale(1.05)'}
                            onMouseOut={e => e.currentTarget.style.transform = 'scale(1)'}
                        >
                            <FaPen style={{ marginRight: '5px' }} /> टिपणी लिहा
                        </button>
                    </h2>

                    {showReviewForm && (
                        <form className="review-form" onSubmit={handleReviewSubmit} style={{
                            background: '#ffffff',
                            padding: '20px',
                            borderRadius: '10px',
                            boxShadow: '0 4px 10px rgba(0, 0, 0, 0.1)',
                            marginBottom: '20px'
                        }}>
                            <div className="form-group" style={{ marginBottom: '15px' }}>
                                <input
                                    type="text"
                                    placeholder="तुमचे नाव"
                                    value={newReview.name}
                                    onChange={(e) => setNewReview({ ...newReview, name: e.target.value })}
                                    required
                                    style={{
                                        width: '100%',
                                        padding: '10px',
                                        border: '1px solid #dbeafe',
                                        borderRadius: '8px',
                                        fontSize: '1rem',
                                        fontFamily: "'Poppins', sans-serif",
                                        transition: 'border-color 0.3s'
                                    }}
                                    onFocus={e => e.currentTarget.style.borderColor = '#1e40af'}
                                    onBlur={e => e.currentTarget.style.borderColor = '#dbeafe'}
                                />
                            </div>
                            <div className="form-group" style={{ marginBottom: '15px' }}>
                                <textarea
                                    placeholder="तुमची टिपणी लिहा..."
                                    value={newReview.text}
                                    onChange={(e) => setNewReview({ ...newReview, text: e.target.value })}
                                    required
                                    style={{
                                        width: '100%',
                                        padding: '10px',
                                        border: '1px solid #dbeafe',
                                        borderRadius: '8px',
                                        fontSize: '1rem',
                                        fontFamily: "'Poppins', sans-serif",
                                        height: '100px',
                                        resize: 'vertical',
                                        transition: 'border-color 0.3s'
                                    }}
                                    onFocus={e => e.currentTarget.style.borderColor = '#1e40af'}
                                    onBlur={e => e.currentTarget.style.borderColor = '#dbeafe'}
                                ></textarea>
                            </div>
                            <div className="form-group rating-group" style={{
                                display: 'flex',
                                alignItems: 'center',
                                marginBottom: '15px'
                            }}>
                                <label style={{
                                    marginRight: '10px',
                                    fontWeight: 'bold',
                                    color: '#1e3a8a'
                                }}>रेटिंग:</label>
                                <div className="stars-input">
                                    {[1, 2, 3, 4, 5].map((star) => (
                                        <span
                                            key={star}
                                            onClick={() => setNewReview({ ...newReview, rating: star })}
                                            style={{ cursor: 'pointer', fontSize: '1.5rem' }}
                                        >
                                            {star <= newReview.rating ? (
                                                <FaStar className="star filled" />
                                            ) : (
                                                <FaRegStar className="star" />
                                            )}
                                        </span>
                                    ))}
                                </div>
                            </div>
                            <button
                                type="submit"
                                className="btn submit-review-btn"
                                style={{
                                    background: 'linear-gradient(90deg, #1e40af, #60a5fa)',
                                    color: 'white',
                                    border: 'none',
                                    padding: '10px 20px',
                                    borderRadius: '20px',
                                    cursor: 'pointer',
                                    fontSize: '1rem',
                                    transition: 'transform 0.3s'
                                }}
                                onMouseOver={e => e.currentTarget.style.transform = 'scale(1.05)'}
                                onMouseOut={e => e.currentTarget.style.transform = 'scale(1)'}
                            >
                                टिपणी सबमिट करा
                            </button>
                        </form>
                    )}

                    <div className="reviews-list" style={{
                        display: 'grid',
                        gap: '15px'
                    }}>
                        {reviews.map((review) => (
                            <div key={review.id} className="review-card animate__animated animate__fadeInUp" style={{
                                background: '#ffffff',
                                padding: '20px',
                                borderRadius: '10px',
                                boxShadow: '0 4px 10px rgba(0, 0, 0, 0.1)'
                            }}>
                                <div className="review-header" style={{
                                    display: 'flex',
                                    alignItems: 'center',
                                    marginBottom: '10px',
                                    justifyContent: 'space-between' // This will push rating to the right
                                }}>
                                    <div style={{
                                        display: 'flex',
                                        alignItems: 'center',
                                        flexGrow: 1 // Takes remaining space
                                    }}>
                                        <div className="user-avatar" style={{
                                            width: '40px',
                                            height: '40px',
                                            background: 'linear-gradient(90deg, #1e40af, #60a5fa)',
                                            color: 'white',
                                            display: 'flex',
                                            alignItems: 'center',
                                            justifyContent: 'center',
                                            borderRadius: '50%',
                                            fontSize: '1.2rem',
                                            marginRight: '10px'
                                        }}>
                                            {review.name.charAt(0).toUpperCase()}
                                        </div>
                                        <div className="user-info" style={{
                                            textAlign: 'left' // Explicit left alignment
                                        }}>
                                            <h4 className="user-name" style={{
                                                fontSize: '1.1rem',
                                                color: '#1e3a8a',
                                                margin: '0'
                                            }}>{review.name}</h4>
                                            <span className="review-time" style={{
                                                fontSize: '0.9rem',
                                                color: '#6b7280'
                                            }}>{review.time}</span>
                                        </div>
                                    </div>
                                    <div className="review-rating" style={{
                                        marginLeft: '10px' // Adds some spacing from user info
                                    }}>
                                        {renderStars(review.rating)}
                                    </div>
                                </div>
                                <div className="review-content">
                                    <p style={{
                                        fontSize: '1rem',
                                        color: '#1f2937',
                                        margin: '0'
                                    }}>{review.text}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default SharePage;