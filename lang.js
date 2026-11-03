/**
 * SwastikCare — Bilingual Language Engine (Bhojpuri ↔ English)
 * Persistent language toggle stored in localStorage.
 * Works across all pages by walking DOM text nodes and replacing known phrases.
 */

(function () {
    'use strict';

    const LANG_KEY = 'swastik_lang';

    // ─── Translation Map: Bhojpuri → English ──────────────────────────────────
    // Ordered longest-first so longer phrases match before sub-phrases.
    const BHO_TO_EN = [

        // ── Page Titles ────────────────────────────────────────────────────────
        ['स्वस्तिक केयर | मुख्य स्वास्थ्य मंच (SwastikCare Home)', 'SwastikCare | National Health Platform (Home)'],
        ['MoveOn सेहत सुधार के सफर | स्वस्तिक केयर', 'MoveOn Recovery Journey | SwastikCare'],
        ['२४/७ मरीज सहायता अउर हेल्पडेस्क | स्वस्तिक केयर', '24/7 Patient Support & Helpdesk | SwastikCare'],
        ['24/7 आपातकालीन SOS अउर एम्बुलेंस 108 | स्वस्तिक केयर', '24/7 Emergency SOS & Ambulance 108 | SwastikCare'],

        // ── Nav / Top-Bar ──────────────────────────────────────────────────────
        ['डेमो प्रोफाइल बदलीं:', 'Switch Demo Profile:'],
        ['मरीज: रोहन मेहता (ठेहुना रिहैब)', 'Patient: Rohan Mehta (Knee Rehab)'],
        ['रोहन (मरीज)', 'Rohan (Patient)'],
        ['रोहन मेहता', 'Rohan Mehta'],
        ['मनीष पांडेय (सुपर एडमिन)', 'Manish Pandey (Super Pro Admin)'],
        ['मरीज: प्रिया शर्मा (शुगर इलाज)', 'Patient: Priya Sharma (Diabetes)'],
        ['मरीज: राहुल वर्मा (हार्ट चेकअप)', 'Patient: Rahul Verma (Heart Checkup)'],
        ['मरीज: अनन्या सिंह (माइग्रेन)', 'Patient: Ananya Singh (Migraine)'],
        ['मरीज: अमित कुमार (दमा)', 'Patient: Amit Kumar (Asthma)'],
        ['अस्पताल स्टाफ: एम्स नई दिल्ली', 'Hospital Staff: AIIMS New Delhi'],
        ['अस्पताल स्टाफ: अपोलो', 'Hospital Staff: Apollo'],
        ['अस्पताल स्टाफ: मैक्स साकेत', 'Hospital Staff: Max Saket'],
        ['अस्पताल स्टाफ: फोर्टिस', 'Hospital Staff: Fortis'],
        ['अस्पताल स्टाफ: मेदांता', 'Hospital Staff: Medanta'],
        ['स्वस्तिक सुपर एडमिन कंट्रोल', 'SwastikCare Super Admin Control'],
        ['24 घंटा आपातकालीन सेवा:', '24-Hour Emergency Service:'],
        ['होम (Home)', 'Home'],
        ['डॉक्टर बुक करीं', 'Book a Doctor'],
        ['जाँच रिपोर्ट', 'Lab Reports'],
        ['वाइटल्स (नाप-जोख)', 'Vitals (Health Metrics)'],
        ['डॉक्टर से बतियाईं', 'Talk to a Doctor'],
        ['अस्पताल पोर्टल', 'Hospital Portal'],
        ['एडमिन पैनल', 'Admin Panel'],
        ['तुरंत एम्बुलेंस 108', 'Emergency Ambulance 108'],
        ['मनीष (मरीज)', 'Manish (Patient)'],
        ['प्रिया (मरीज)', 'Priya (Patient)'],
        ['राहुल (मरीज)', 'Rahul (Patient)'],
        ['अनन्या (मरीज)', 'Ananya (Patient)'],
        ['अमित (मरीज)', 'Amit (Patient)'],
        ['एम्स (AIIMS) स्टाफ', 'AIIMS Staff'],
        ['अपोलो स्टाफ', 'Apollo Staff'],
        ['मैक्स स्टाफ', 'Max Staff'],
        ['फोर्टिस स्टाफ', 'Fortis Staff'],
        ['मेदांता स्टाफ', 'Medanta Staff'],
        ['सुपर एडमिन (Admin)', 'Super Admin'],
        ['अस्पताल स्टाफ', 'Hospital Staff'],
        ['लॉगिन', 'Login'],
        ['एडमिन', 'Admin'],
        ['मरीज', 'Patient'],

        // ── Footer ─────────────────────────────────────────────────────────────
        ['मरीज सेवा पोर्टल', 'Patient Service Portal'],
        ['होम पेज (मुख्य पृष्ठ)', 'Home Page'],
        ['डॉक्टर अपॉइंटमेंट बुक करीं', 'Book Doctor Appointment'],
        ['डिजिटल स्वास्थ्य लॉकर', 'Digital Health Locker'],
        ['वाइटल्स (बीपी, धड़कन, शुगर)', 'Vitals (BP, Heart Rate, Sugar)'],
        ['MoveOn सेहत सुधार सफर', 'MoveOn Recovery Journey'],
        ['चिकित्सा नेटवर्क', 'Medical Network'],
        ['अस्पताल साथी पोर्टल', 'Hospital Partner Portal'],
        ['सुपर एडमिन कंसोल', 'Super Admin Console'],
        ['डॉक्टर से ऑनलाइन बात', 'Online Doctor Consultation'],
        ['24/7 एम्बुलेंस 108 सेवा', '24/7 Ambulance 108 Service'],
        ['अस्पताल बिल अउर रसीद', 'Hospital Bills & Receipts'],
        ['आपातकालीन नंबर', 'Emergency Numbers'],
        ['राष्ट्रीय एम्बुलेंस:', 'National Ambulance:'],
        ['एम्स ट्रॉमा हेल्पलाइन:', 'AIIMS Trauma Helpline:'],
        ['अपोलो इमरजेंसी:', 'Apollo Emergency:'],
        ['फोर्टिस हेल्पलाइन:', 'Fortis Helpline:'],
        ['24/7 मदद अउर सहायता केंद्र', '24/7 Help & Support Centre'],
        ['राउर स्वास्थ्य, हमार जिम्मेवारी! स्वस्तिक केयर भारत के 5 गो सबसे नामी अस्पतालन (एम्स, अपोलो, मैक्स, फोर्टिस अउर मेदांता) के 25 गो नामी डॉक्टर लोगन से मरीज के सीधा जोड़े वाला आधुनिक डिजिटल स्वास्थ्य नेटवर्क ह।', "Your Health, Our Responsibility! SwastikCare is India's modern digital health network directly connecting patients with 25 renowned doctors from India's top 5 hospitals (AIIMS, Apollo, Max, Fortis & Medanta)."],
        ['आभा (ABDM) प्रमाणित', 'ABHA (ABDM) Certified'],
        ['100% सुरक्षित डेटा', '100% Secure Data'],
        ['NABH पार्टनर अस्पताल', 'NABH Partner Hospital'],
        ['© 2026 स्वस्तिक केयर राष्ट्रीय स्वास्थ्य मंच। सब अधिकार सुरक्षित बा।', '© 2026 SwastikCare National Health Platform. All Rights Reserved.'],
        ['मरीज, डॉक्टर अउर अस्पताल के सहज जुड़ाव खातिर समर्पित।', 'Dedicated to seamlessly connecting Patients, Doctors & Hospitals.'],

        // ── index.html Hero ────────────────────────────────────────────────────
        ['भारत के शीर्ष 5 गो अस्पतालन के डिजिटल नेटवर्क', "India's Top 5 Hospitals Digital Network"],
        ['राउर स्वास्थ्य, हमार जिम्मेवारी! देश के 5 गो सबसे बड़का अस्पतालन से सीधा जुड़ाव।', 'Your Health, Our Responsibility! Directly connected to the 5 largest hospitals in the country.'],
        ['एम्स (AIIMS), अपोलो, मैक्स, फोर्टिस अउर मेदांता के 25 गो नामी डॉक्टरन से तुरंत अपॉइंटमेंट, खाली बिस्तर (बेड) अउर आईसीयू के ताजा जानकारी, अउर डिजिटल स्वास्थ्य परचा।', 'Instant appointments with 25 top doctors from AIIMS, Apollo, Max, Fortis & Medanta. Live bed & ICU availability and digital health prescriptions.'],
        ['अस्पताल, डॉक्टर के नाम (जैसे डॉ. गुलेरिया), चाहे बीमारी (हार्ट, हड्डी, शुगर) खोजीं...', 'Search by hospital, doctor name (e.g. Dr. Guleria), or illness (Heart, Bone, Diabetes)...'],
        ['ओपीडी खोजीं', 'Search OPD'],
        ['लाग इन भइल मरीज के जानकारी', 'LOGGED-IN PATIENT INFO'],
        ['ठेहुना के लिगामेंट सर्जरी के बाद रिहैब', 'Post Knee Ligament Surgery Rehab'],
        ['प्राथमिक अस्पताल:', 'Primary Hospital:'],
        ['धड़कन / नब्ज', 'Heart Rate / Pulse'],
        ['रक्तचाप (BP)', 'Blood Pressure (BP)'],
        ['सुधार प्रोग्रेस', 'Recovery Progress'],
        ['अपॉइंटमेंट बुक करीं', 'Book Appointment'],
        ['5 अस्पताल अउर 25 डॉक्टर में से चुनीं', 'Choose from 5 hospitals & 25 doctors'],
        ['जाँच रिपोर्ट अउर परचा', 'Lab Reports & Prescriptions'],
        ['डिजिटल एक्सरे, खून जाँच अउर दवाई', 'Digital X-Ray, Blood Tests & Medicines'],
        ['घर बैठे सलाह अउर वीडियो कंसल्टेशन', 'Home consultation & video consultation'],
        ['आपातकाल SOS 108', 'Emergency SOS 108'],
        ['1 क्लिक पर तुरंत एम्बुलेंस बुलाईं', '1-Click instant ambulance call'],
        ['मान्यता प्राप्त नेटवर्क अस्पताल', 'Accredited Network Hospitals'],
        ['दिल्ली-एनसीआर के 5 गो प्रमुख अस्पतालन में खाली बिस्तर अउर आईसीयू के ताजा हाल', 'Live bed & ICU status across 5 major Delhi-NCR hospitals'],
        ['5 गो अस्पताल उपलब्ध', '5 Hospitals Available'],
        ['खाली बेड', 'Beds Free'],
        ['समीक्षा', 'Reviews'],
        ['इहाँ डॉक्टर बुक करीं', 'Book Doctor Here'],
        ['प्रमुख विशेषज्ञ डॉक्टर लोग (कुल 25 डॉक्टर)', 'Senior Specialist Doctors (Total 25 Doctors)'],
        ['हर अस्पताल के 5 गो वरिष्ठ डॉक्टर जे रोज ओपीडी में मरीज लोगन के देखेले', '5 senior doctors per hospital who see OPD patients daily'],
        ['सभ्भे डॉक्टर (25)', 'All Doctors (25)'],
        ['एम्स (5)', 'AIIMS (5)'],
        ['अपोलो (5)', 'Apollo (5)'],
        ['मैक्स (5)', 'Max (5)'],
        ['फोर्टिस (5)', 'Fortis (5)'],
        ['मेदांता (5)', 'Medanta (5)'],
        ['राष्ट्रीय डिजिटल स्वास्थ्य व्यवस्था', 'National Digital Health System'],
        ['आयुष्मान भारत (ABDM) मानकन पर आधारित, सुरक्षित इलेक्ट्रॉनिक स्वास्थ्य परचा अउर जांच रिपोर्ट।', 'Based on Ayushman Bharat (ABDM) standards — secure electronic health prescriptions and lab reports.'],
        ['प्रमुख अस्पताल', 'Partner Hospitals'],
        ['वरिष्ठ डॉक्टर', 'Senior Doctors'],
        ['हर अस्पताल से 5 गो विशेषज्ञ', '5 specialists per hospital'],
        ['कुल बिस्तर (बेड्स)', 'Total Beds'],
        ['लाइव आईसीयू अउर वार्ड मॉनिटरिंग', 'Live ICU & Ward Monitoring'],
        ['मरीज संतुष्टि', 'Patient Satisfaction'],
        ['प्रमाणित समीक्षा अउर रेटिंग', 'Verified Reviews & Ratings'],
        ['तजुर्बा / अनुभव', 'Experience'],
        ['फीस', 'Fee'],
        ['रेटिंग', 'Rating'],
        ['ओपीडी दिन', 'OPD Days'],
        ['बतियाईं', 'Chat'],
        ['ओपीडी बुक करीं', 'Book OPD'],
        ['गो डॉक्टर भेटाइल!', 'doctors found!'],

        // ── Emergency.html ─────────────────────────────────────────────────────
        ['राष्ट्रीय 108 आपातकालीन नेटवर्क सक्रिय बा', 'National 108 Emergency Network Active'],
        ['तुरंत 108 आपातकालीन एम्बुलेंस SOS', 'Immediate 108 Emergency Ambulance SOS'],
        ['नीचे दिहल लाल बटन दबावे पर तुरंत राउर लाइव लोकेशन नजदीकी अस्पताल अउर 108 एम्बुलेंस के भेज दिहल जाई।', 'Pressing the red button below will instantly send your live location to the nearest hospital and 108 ambulance.'],
        ['दबा के एम्बुलेंस बुलाईं', 'Tap to call ambulance'],
        ['राउर पता (GPS Location):', 'Your Location (GPS):'],
        ['नई दिल्ली सेंट्रल (28.6139° N, 77.2090° E)', 'New Delhi Central (28.6139° N, 77.2090° E)'],
        ['रवाना हो चुकल बा', 'Dispatched'],
        ['पहुंचे के समय:', 'ETA:'],
        ['अस्पताल:', 'Hospital:'],
        ['एम्स नई दिल्ली ट्रॉमा सेंटर', 'AIIMS New Delhi Trauma Centre'],
        ['पैरामेडिक इंचार्ज:', 'Paramedic In-Charge:'],
        ['राजेश शर्मा (क्रिटिकल केयर)', 'Rajesh Sharma (Critical Care)'],
        ['इमरजेंसी वार्ड:', 'Emergency Ward:'],
        ['कैथ-लैब अउर बेड #ICU-04 तैयार बा', 'Cath-Lab & Bed #ICU-04 Ready'],
        ['5 गो मुख्य अस्पताल के सीधा इमरजेंसी नंबर', 'Direct Emergency Numbers for 5 Key Hospitals'],
        ['कवनो भी आपात स्थिति में सीधे इमरजेंसी ड्यूटी डॉक्टर से बात करीं', 'In any emergency, speak directly with the on-duty emergency doctor'],
        ['आपातकाल में जरूरी प्राथमिक उपचार (First Aid)', 'Essential First Aid in an Emergency'],
        ['रेड क्रॉस प्रमाणित', 'Red Cross Certified'],
        ['दिल के दौरा (Heart Attack)', 'Heart Attack'],
        ['मरीज के तुरंत सपाट सुताईं, सांस चेक करीं। सीना के बीच में दुनो हाथ रख के तेजी से 100-120 प्रति मिनट के रफ्तार से दबाईं (CPR) अउर 108 बुलाईं।', 'Lay the patient flat, check breathing. Place both hands on the centre of the chest and press firmly at 100-120/min (CPR). Call 108 immediately.'],
        ['लकवा / स्ट्रोक (Stroke)', 'Stroke'],
        ['मुंह टेढ़ा होखल, हाथ ना उठल, बोली लड़खड़ाइल। ई देखाई देवे त बिना 1 मिनट गंवावे मरीज के एम्स चाहे अपोलो के इमरजेंसी में ले जाईं।', 'Face drooping, arm weakness, slurred speech - rush the patient to AIIMS or Apollo Emergency without losing a minute.'],
        ['खून जादे बहल', 'Severe Bleeding'],
        ['कटाव वाली जगह पर साफ कपड़ा भा पट्टी से जोर से दबाईं। घायल अंग के दिल के स्तर से ऊपर उठा के राखीं जबले मदद ना पहुँचे।', 'Press a clean cloth or bandage firmly on the wound. Keep the injured limb raised above heart level until help arrives.'],
        ['अलर्ट: नजदीकी अस्पताल अउर 108 एम्बुलेंस के लोकेशन भेज दिहल गइल बा!', 'Alert: Live location sent to nearest hospital and 108 ambulance!'],
        ['एम्बुलेंस पहुँच गइल बा!', 'Ambulance has arrived!'],
        ['एम्बुलेंस मरीज के लोकेशन पर पहुँच चुकल बा!', 'Ambulance has reached the patient location!'],
        ['अक्षांश:', 'Lat:'],
        ['देशांतर:', 'Lon:'],
        ['(GPS लॉक बा)', '(GPS Locked)'],
        ['5 मिनट', '5 minutes'],
        [' मिनट', ' min'],

        // ── Support.html ───────────────────────────────────────────────────────
        ['२४/७ मरीज सहायता अउर शिकायत निवारण केंद्र', '24/7 Patient Support & Grievance Centre'],
        ['अपॉइंटमेंट बदले, अस्पताल बिलिंग सवाल, अउर डिजिटल स्वास्थ्य रिकॉर्ड खातिर हरमेसा तैयार हेल्पलाइन।', 'Always-ready helpline for appointment changes, hospital billing queries and digital health records.'],
        ['टोल-फ्री: १८००-११-२२३३', 'Toll-Free: 1800-11-2233'],
        ['सहायता भा शिकायत टिकट दर्ज करीं', 'Submit a Support or Grievance Ticket'],
        ['औसत जवाब: १५ मिनट', 'Avg. Response: 15 minutes'],
        ['राउर नाम', 'Your Name'],
        ['मोबाइल फोन नंबर', 'Mobile Phone Number'],
        ['संबंधित अस्पताल', 'Related Hospital'],
        ['सवाल / समस्या के श्रेणी', 'Query / Issue Category'],
        ['ओपीडी बुकिंग अउर समय बदलाव', 'OPD Booking & Rescheduling'],
        ['लैब टेस्ट रिपोर्ट के स्थिति', 'Lab Test Report Status'],
        ['बिलिंग अउर आयुष्मान/बीमा क्लेम', 'Billing & Ayushman/Insurance Claim'],
        ['पोर्टल चलावे में तकनीकी दिक्कत', 'Technical Issue with Portal'],
        ['पूरा विवरण लिखीं', 'Write Full Description'],
        ['आपन सवाल भा समस्या के पूरा विस्तार से लिखीं...', 'Describe your query or problem in detail...'],
        ['अस्पताल डेस्क के टिकट भेजीं', 'Send Ticket to Hospital Desk'],
        ['अक्सर पूछल जाए वाला सवाल (FAQs)', 'Frequently Asked Questions (FAQs)'],
        ['अपॉइंटमेंट के तारीख भा समय कइसे बदलीं?', 'How do I change my appointment date or time?'],
        ["'ओपीडी बुक करीं' पन्ना पर जाईं, नया तारीख अउर डॉक्टर चुनीं, अस्पताल के कतार में तुरंते नया टोकन मिल जाई।", "Go to 'Book OPD' page, select a new date and doctor — a new token will be issued immediately in the hospital queue."],
        ['का हमार मेडिकल रिकॉर्ड सुरक्षित बा?', 'Is my medical record secure?'],
        ['हाँ, सभ्भे जाँच रिपोर्ट आयुष्मान भारत डिजिटल मिशन (ABDM) के कड़ा नियमन से सुरक्षित बा अउर खाली रउवा भा राउर डॉक्टर देख सकत बाड़न।', 'Yes, all lab reports are secured under strict Ayushman Bharat Digital Mission (ABDM) regulations and can only be viewed by you or your doctor.'],
        ['अगर कवनो गंभीर आपातकाल आवे तब का करीं?', 'What should I do in a serious emergency?'],
        ["ऊपर दाहिने हाथ पर लाल रंग के '१०८ इमरजेंसी' बटन दबाईं भा तुरंत १०८ पर फोन लगाईं, सबसे नजदीकी एम्बुलेंस रवाना हो जाई।", "Press the red '108 Emergency' button in the top-right, or call 108 immediately — the nearest ambulance will be dispatched."],
        ['सीधे जन-शिकायत निवारण अधिकारी', 'Grievance Redressal Officer (Direct Contact)'],
        ['राष्ट्रीय स्वास्थ्य मिशन भवन, इंस्टीट्यूशनल एरिया, नई दिल्ली ११०००३', 'National Health Mission Building, Institutional Area, New Delhi 110003'],

        // ── My-Journey.html ────────────────────────────────────────────────────
        ['MoveOn सेहत सुधार के सफर', 'MoveOn Health Recovery Journey'],
        ['डॉ. राजेश मल्होत्रा (एम्स) अउर डॉ. शालिह कपूर (मैक्स) द्वारा तैयार कइल गइल व्यक्तिगत फिजियोथेरेपी रोडमैप।', 'Personalised physiotherapy roadmap prepared by Dr. Rajesh Malhotra (AIIMS) and Dr. Shalih Kapoor (Max).'],
        ['आजु के कसरत दर्ज करीं', "Log Today's Exercise"],
        ['सुधार पूरा भइल', 'Recovery Complete'],
        ['पूरा तरे ठीक होखे में अनुमानित समय: २४ दिन', 'Estimated full recovery: 24 days'],
        ['रोजाना कसरत के स्ट्रीक:', 'Daily exercise streak:'],
        ['🔥 १८ दिन लगातार', '🔥 18 consecutive days'],
        ['सलाह दिहल फिजियो:', 'Prescribed physio:'],
        ['४५ मिनट/दिन', '45 min/day'],
        ['अगिला डॉक्टरी जाँच:', 'Next Doctor Check-up:'],
        ['०२ नवंबर, २०२६', '02 November, 2026'],
        ['फिजियोथेरेपी सुपरवाइजर', 'Physiotherapy Supervisor'],
        ['डॉ. शालिह कपूर', 'Dr. Shalih Kapoor'],
        ['स्पोर्ट्स रिहैब • मैक्स सुपर स्पेशियलिटी', 'Sports Rehab - Max Super Speciality'],
        ['डॉक्टर से बात करीं', 'Talk to Doctor'],
        ['सेहत सुधार के माइलस्टोन (Roadmap)', 'Recovery Milestone Roadmap'],
        ['चरण ३: मजबूती अउर बैलेंस', 'Phase 3: Strength & Balance'],
        ['चरण १: ऑपरेशन के बाद सूजन पर नियंत्रण', 'Phase 1: Post-Surgery Swelling Control'],
        ['पूरा भइल', 'Completed'],
        ['क्रायोथेरेपी (बर्फ सिकाई) अउर पैर के सीधा-मोड़े के अभ्यास (०° से ९०° तक)।', 'Cryotherapy (ice pack) and leg extension/flexion exercises (0 to 90 degrees).'],
        ['चरण २: वजन सम्हार के चले के अभ्यास', 'Phase 2: Weight-Bearing Walking Practice'],
        ['बैसाखी छोड़े के अभ्यास, स्थिर साइकिल चलावल अउर जांघ के नस मजबूत करे के कसरत।', 'Crutch-free walking, stationary cycling and quadriceps strengthening exercises.'],
        ['चरण ३: काइनेटिक मजबूती अउर शारीरिक संतुलन', 'Phase 3: Kinetic Strength & Physical Balance'],
        ['वर्तमान चरण (१८/३० दिन)', 'Current Phase (18/30 days)'],
        ['हैमस्ट्रिंग कर्ल, संतुलन वोबल बोर्ड पर अभ्यास अउर रेसिस्टेंस बैंड के साथ कसरत।', 'Hamstring curls, balance wobble-board drills and resistance band exercises.'],
        ['चरण ४: जोगिंग अउर फुर्ती में पूरा वापसी', 'Phase 4: Full Return to Jogging & Agility'],
        ['आवे वाला', 'Upcoming'],
        ['कूद के संतुलन टेस्ट, हर दिशा में तेजी से मुड़े के अभ्यास अउर खेलकूद में सक्रिय वापसी।', 'Jump-landing balance test, multi-directional agility drills and active return-to-sport.'],
        ['आजु के रिहैबिलिटेशन कसरत दर्ज हो गइल! सेहत सुधार +२%', "Today's rehabilitation exercise logged! Recovery +2%"],

        // ── Common Phrases ─────────────────────────────────────────────────────
        ['एम्स नई दिल्ली', 'AIIMS New Delhi'],
        ['मनीष पांडेय', 'Manish Pandey'],
        ['अपॉइंटमेंट', 'Appointment'],
        ['आपातकालीन', 'Emergency'],
        ['एम्बुलेंस', 'Ambulance'],
    ];

    // ─── Language State ────────────────────────────────────────────────────────
    let currentLang = 'en';
    try {
        localStorage.setItem(LANG_KEY, 'en');
    } catch (e) { }

    // ─── DOM Translation Engine ────────────────────────────────────────────────
    function translateNode(node, map) {
        if (node.nodeType === Node.TEXT_NODE) {
            let text = node.nodeValue;
            if (!text || !text.trim()) return;
            for (const [from, to] of map) {
                if (text.includes(from)) {
                    text = text.split(from).join(to);
                }
            }
            node.nodeValue = text;
        } else if (
            node.nodeType === Node.ELEMENT_NODE &&
            node.tagName !== 'SCRIPT' &&
            node.tagName !== 'STYLE' &&
            node.tagName !== 'NOSCRIPT'
        ) {
            if (node.placeholder) {
                let ph = node.placeholder;
                for (const [from, to] of map) {
                    if (ph.includes(from)) ph = ph.split(from).join(to);
                }
                node.placeholder = ph;
            }
            if (node.title) {
                let t = node.title;
                for (const [from, to] of map) {
                    if (t.includes(from)) t = t.split(from).join(to);
                }
                node.title = t;
            }
            for (const child of node.childNodes) {
                translateNode(child, map);
            }
        }
    }

    function applyLanguage(lang) {
        if (lang === 'en') {
            translateNode(document.body, BHO_TO_EN);
            let title = document.title;
            for (const [from, to] of BHO_TO_EN) {
                if (title.includes(from)) title = title.split(from).join(to);
            }
            document.title = title;
            document.documentElement.lang = 'en';
        } else {
            document.documentElement.lang = 'bho';
        }

        const btn = document.getElementById('langToggleBtn');
        if (btn) {
            btn.innerHTML = (lang === 'en')
                ? '<i class="fa fa-language"></i> <span>भोजपुरी</span>'
                : '<i class="fa fa-language"></i> <span>English</span>';
            btn.title = (lang === 'en') ? 'Switch to Bhojpuri' : 'Switch to English';
        }
    }

    window.SwastikLang = {
        get: () => currentLang,
        toggle: function () {
            currentLang = (currentLang === 'bho') ? 'en' : 'bho';
            localStorage.setItem(LANG_KEY, currentLang);
            location.reload();
        },
        apply: function () {
            applyLanguage(currentLang);
        }
    };

    function onReady() {
        window.SwastikLang.apply();
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', onReady);
    } else {
        setTimeout(onReady, 80);
    }
})();
