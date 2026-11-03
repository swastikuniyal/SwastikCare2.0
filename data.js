/**
 * SwastikCare - National Healthcare Platform (English Edition)
 * Core Data Engine & State Management
 * Includes:
 *  - 5 Leading Super-Specialty Hospitals with live bed & ICU telemetry
 *  - 25 Renowned Specialist Doctors (5 per hospital)
 *  - 5 Detailed Patient Clinical Profiles & Vitals
 *  - Appointments, Lab Reports, EHR Records & GST Invoices
 *  - Role-based Login & 1-Click Persona Switcher
 */

(function () {
    const STORAGE_KEY_DATA = "swastik_care_data_v4_admin";
    const STORAGE_KEY_SESSION = "swastik_care_session_v4_admin";

    // 5 Leading Network Hospitals
    const defaultHospitals = [
        {
            id: "hosp-1",
            code: "aiims",
            name: "AIIMS New Delhi",
            subtitle: "All India Institute of Medical Sciences",
            type: "Apex Autonomous Medical Research Institute & Hospital",
            logo: "🏥",
            logoBadge: "AIIMS",
            accentColor: "#0d9488",
            location: "Ansari Nagar East, New Delhi 110029",
            phone: "+91 11 2658 8500",
            emergencyPhone: "102 / +91 11 2659 4405",
            email: "director@aiims.edu.in",
            rating: 4.9,
            reviewCount: 18420,
            bedsTotal: 2450,
            bedsOccupied: 2308,
            bedsAvailable: 142,
            bedsICU: 28,
            established: 1956,
            accreditation: "National Apex Medical Institute | NABH Accredited",
            description: "India's premier autonomous medical research institution providing 24/7 level-1 emergency trauma care and advanced super-specialty treatment.",
            specialties: ["Pulmonology & Critical Care", "Cardiothoracic Surgery (CTVS)", "Pediatric Cardiology", "Medical Oncology", "Orthopedics & Joint Replacement"]
        },
        {
            id: "hosp-2",
            code: "apollo",
            name: "Indraprastha Apollo Hospitals",
            subtitle: "Apollo Hospitals Enterprise Ltd.",
            type: "JCI Accredited Multi-Super Specialty Hospital",
            logo: "🛡️",
            logoBadge: "APOLLO",
            accentColor: "#2563eb",
            location: "Sarita Vihar, Delhi-Mathura Road, New Delhi 110076",
            phone: "+91 11 7179 1090",
            emergencyPhone: "1066 (Apollo Emergency)",
            email: "care@apollohospitals.com",
            rating: 4.8,
            reviewCount: 14290,
            bedsTotal: 710,
            bedsOccupied: 624,
            bedsAvailable: 86,
            bedsICU: 19,
            established: 1996,
            accreditation: "JCI USA Accredited | NABH | NABL Certified",
            description: "World-class center renowned for robotic surgery, organ transplantation, cardiology, and comprehensive neurology care.",
            specialties: ["Internal Medicine", "Cardiovascular Surgery", "Pediatric Cardiology", "Neurosurgery & Spine", "Clinical Dermatology"]
        },
        {
            id: "hosp-3",
            code: "max",
            name: "Max Super Speciality Hospital (Saket)",
            subtitle: "Max Healthcare Institute",
            type: "NABH Accredited Super-Specialty Healthcare Centre",
            logo: "❤️",
            logoBadge: "MAX",
            accentColor: "#dc2626",
            location: "1, 2 Press Enclave Marg, Saket, New Delhi 110017",
            phone: "+91 11 2651 5050",
            emergencyPhone: "+91 11 4055 4055",
            email: "customercare@maxhealthcare.com",
            rating: 4.8,
            reviewCount: 11850,
            bedsTotal: 550,
            bedsOccupied: 486,
            bedsAvailable: 64,
            bedsICU: 15,
            established: 2006,
            accreditation: "NABH Accredited | Green OT & Eco-Hospital Certified",
            description: "Premier tertiary care center renowned for advanced cardiac interventions, orthopedic joint reconstruction, gastro sciences, and women's health.",
            specialties: ["Interventional Cardiology", "Physiotherapy & Sports Rehab", "Obstetrics & Gynecology", "Urology & Robotic Surgery", "Gastroenterology & Hepatology"]
        },
        {
            id: "hosp-4",
            code: "fortis",
            name: "Fortis Memorial Research Institute (FMRI)",
            subtitle: "Fortis Healthcare Gurugram",
            type: "Next-Gen Quaternary Care Hospital",
            logo: "🌱",
            logoBadge: "FORTIS",
            accentColor: "#16a34a",
            location: "Sector 44, Opposite HUDA City Centre, Gurugram 122002",
            phone: "+91 124 716 2200",
            emergencyPhone: "+91 124 492 1021",
            email: "reachus@fortishealthcare.com",
            rating: 4.7,
            reviewCount: 9670,
            bedsTotal: 400,
            bedsOccupied: 348,
            bedsAvailable: 52,
            bedsICU: 12,
            established: 2012,
            accreditation: "NABH | JCI Accredited Global Excellence Centre",
            description: "State-of-the-art medical institution known for CyberKnife robotic radiosurgery, complex liver transplants, and precision oncology.",
            specialties: ["Interventional Cardiology", "Medical Oncology", "CyberKnife Radiosurgery", "Liver Transplant & HPB", "Diabetes & Endocrinology"]
        },
        {
            id: "hosp-5",
            code: "medanta",
            name: "Medanta - The Medicity",
            subtitle: "Medanta Healthcare Hub Gurugram",
            type: "Global Multi-Super Specialty Healthcare Institute",
            logo: "⚕️",
            logoBadge: "MEDANTA",
            accentColor: "#d97706",
            location: "CH Bakhtawar Singh Road, Sector 38, Gurugram 122001",
            phone: "+91 124 414 1414",
            emergencyPhone: "1068 (Medanta Flying Doctors)",
            email: "info@medanta.org",
            rating: 4.9,
            reviewCount: 16300,
            bedsTotal: 1250,
            bedsOccupied: 1140,
            bedsAvailable: 110,
            bedsICU: 32,
            established: 2009,
            accreditation: "JCI | NABH | NABL Certified",
            description: "Founded by Dr. Naresh Trehan, one of Asia's largest multi-specialty medical institutes renowned for cardiac surgery, living donor liver transplants, and critical care.",
            specialties: ["Cardiac Surgery", "Living Donor Liver Transplant", "Critical Care & Pulmonology", "TAVI Valve Interventions", "Infectious Diseases"]
        }
    ];

    // 25 Specialist Doctors (5 per Hospital)
    const defaultDoctors = [
        // AIIMS Doctors (hosp-1)
        {
            id: "dr-1",
            hospitalId: "hosp-1",
            hospitalName: "AIIMS New Delhi",
            name: "Dr. Randeep Guleria",
            qualification: "MD, DM (Pulmonology), AIIMS",
            specialty: "Pulmonology & Critical Care",
            designation: "Former Director & HOD, AIIMS",
            experience: "28+ Years Experience",
            experienceNum: 28,
            rating: 4.95,
            reviewCount: 1420,
            consultationFee: 500,
            opdDays: ["Mon", "Wed", "Fri"],
            opdTime: "09:00 AM - 01:00 PM",
            room: "OPD Block A, Room 102",
            isOnline: true,
            avatar: "https://images.unsplash.com/photo-1622253692010-333f2da6031d?auto=format&fit=crop&w=400&q=80",
            bio: "Renowned pulmonologist and pioneer in respiratory care, asthma management, and post-COVID pulmonary rehabilitation."
        },
        {
            id: "dr-2",
            hospitalId: "hosp-1",
            hospitalName: "AIIMS New Delhi",
            name: "Dr. Balram Airan",
            qualification: "MCh (CTVS), MS, MBBS",
            specialty: "Cardiothoracic Surgery (CTVS)",
            designation: "Chief, CTC Centre, AIIMS",
            experience: "25+ Years Experience",
            experienceNum: 25,
            rating: 4.90,
            reviewCount: 1180,
            consultationFee: 600,
            opdDays: ["Tue", "Thu", "Sat"],
            opdTime: "10:00 AM - 02:00 PM",
            room: "CTC Block, Room 204",
            isOnline: true,
            avatar: "https://images.unsplash.com/photo-1537368910025-700350fe46c7?auto=format&fit=crop&w=400&q=80",
            bio: "Renowned cardiothoracic surgeon with over 10,000 successful open-heart procedures, bypass surgeries, and heart valve repairs."
        },
        {
            id: "dr-3",
            hospitalId: "hosp-1",
            hospitalName: "AIIMS New Delhi",
            name: "Dr. Anita Saxena",
            qualification: "MD, DM (Cardiology), FACC",
            specialty: "Pediatric Cardiology",
            designation: "Senior Professor & Consultant",
            experience: "22+ Years Experience",
            experienceNum: 22,
            rating: 4.85,
            reviewCount: 940,
            consultationFee: 500,
            opdDays: ["Mon", "Tue", "Wed", "Thu"],
            opdTime: "09:30 AM - 01:30 PM",
            room: "Maternal & Child Block, Room 305",
            isOnline: false,
            avatar: "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?auto=format&fit=crop&w=400&q=80",
            bio: "Leading specialist in congenital heart defects, neonatal cardiac care, and non-invasive pediatric interventions."
        },
        {
            id: "dr-4",
            hospitalId: "hosp-1",
            hospitalName: "AIIMS New Delhi",
            name: "Dr. P. K. Julka",
            qualification: "MD (Radiotherapy), FAMS",
            specialty: "Medical Oncology",
            designation: "Padma Shri Awardee, Oncology Lead",
            experience: "26+ Years Experience",
            experienceNum: 26,
            rating: 4.92,
            reviewCount: 1320,
            consultationFee: 700,
            opdDays: ["Mon", "Fri"],
            opdTime: "11:00 AM - 03:00 PM",
            room: "IRCH Cancer Centre, Room 101",
            isOnline: true,
            avatar: "https://images.unsplash.com/photo-1582750433449-648ed127bb54?auto=format&fit=crop&w=400&q=80",
            bio: "Padma Shri recipient and leading authority in targeted immunotherapy, molecular therapies, and clinical trials for oncology."
        },
        {
            id: "dr-5",
            hospitalId: "hosp-1",
            hospitalName: "AIIMS New Delhi",
            name: "Dr. Rajesh Malhotra",
            qualification: "MS (Ortho), FRCS, FACS",
            specialty: "Orthopedics & Joint Replacement",
            designation: "Head, Orthopedics & Trauma Centre",
            experience: "20+ Years Experience",
            experienceNum: 20,
            rating: 4.88,
            reviewCount: 1050,
            consultationFee: 550,
            opdDays: ["Wed", "Sat"],
            opdTime: "09:00 AM - 01:00 PM",
            room: "Trauma Centre, Room 402",
            isOnline: true,
            avatar: "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?auto=format&fit=crop&w=400&q=80",
            bio: "Master surgeon specializing in robotic total knee replacement, revision hip reconstruction, and complex sports ligament repairs."
        },

        // Apollo Doctors (hosp-2)
        {
            id: "dr-6",
            hospitalId: "hosp-2",
            hospitalName: "Indraprastha Apollo Hospitals",
            name: "Dr. Prathap C. Reddy",
            qualification: "MD, FRCP, FCCP",
            specialty: "Internal Medicine & Preventive Care",
            designation: "Chairman Emeritus & Chief Physician",
            experience: "32+ Years Experience",
            experienceNum: 32,
            rating: 4.96,
            reviewCount: 1890,
            consultationFee: 2000,
            opdDays: ["Mon", "Wed"],
            opdTime: "10:00 AM - 01:00 PM",
            room: "Tower B, Executive Suite 10",
            isOnline: true,
            avatar: "https://images.unsplash.com/photo-1537368910025-700350fe46c7?auto=format&fit=crop&w=400&q=80",
            bio: "Healthcare visionary with expertise in multi-system lifestyle disorders, cardiac prevention, and personalized executive health."
        },
        {
            id: "dr-7",
            hospitalId: "hosp-2",
            hospitalName: "Indraprastha Apollo Hospitals",
            name: "Dr. N. N. Khanna",
            qualification: "MD, DM (Cardiology), FACC",
            specialty: "Cardiovascular Surgery",
            designation: "Senior Consultant, Heart & Vascular",
            experience: "24+ Years Experience",
            experienceNum: 24,
            rating: 4.89,
            reviewCount: 1120,
            consultationFee: 1600,
            opdDays: ["Tue", "Thu", "Sat"],
            opdTime: "11:00 AM - 03:00 PM",
            room: "Cardio OPD, Room 112",
            isOnline: true,
            avatar: "https://images.unsplash.com/photo-1622253692010-333f2da6031d?auto=format&fit=crop&w=400&q=80",
            bio: "Internationally renowned for complex coronary angioplasties, carotid stenting, and peripheral arterial interventions."
        },
        {
            id: "dr-8",
            hospitalId: "hosp-2",
            hospitalName: "Indraprastha Apollo Hospitals",
            name: "Dr. Muthu Jothi",
            qualification: "FRCS (Paed Cardio), MCh",
            specialty: "Pediatric Cardiothoracic Surgery",
            designation: "Senior Pediatric Heart Surgeon",
            experience: "21+ Years Experience",
            experienceNum: 21,
            rating: 4.87,
            reviewCount: 860,
            consultationFee: 1500,
            opdDays: ["Mon", "Wed", "Fri"],
            opdTime: "09:30 AM - 01:30 PM",
            room: "Children's Heart Centre, Room 201",
            isOnline: false,
            avatar: "https://images.unsplash.com/photo-1582750433449-648ed127bb54?auto=format&fit=crop&w=400&q=80",
            bio: "Expert in corrective surgery for complex congenital heart conditions in newborns and pediatric patients."
        },
        {
            id: "dr-9",
            hospitalId: "hosp-2",
            hospitalName: "Indraprastha Apollo Hospitals",
            name: "Dr. Alok Sharma",
            qualification: "MCh (Neurosurgery), MS",
            specialty: "Neurosurgery & Spine",
            designation: "Director, Neuro Sciences Institute",
            experience: "23+ Years Experience",
            experienceNum: 23,
            rating: 4.91,
            reviewCount: 1250,
            consultationFee: 1800,
            opdDays: ["Tue", "Fri"],
            opdTime: "10:00 AM - 02:00 PM",
            room: "Neuro Block, Room 202",
            isOnline: true,
            avatar: "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?auto=format&fit=crop&w=400&q=80",
            bio: "Specializes in minimally invasive endoscopic brain surgery, spinal disc corrections, and neuro-oncology."
        },
        {
            id: "dr-10",
            hospitalId: "hosp-2",
            hospitalName: "Indraprastha Apollo Hospitals",
            name: "Dr. Rashmi Sarkar",
            qualification: "MD, MNAMS (Dermatology)",
            specialty: "Clinical Dermatology & Aesthetics",
            designation: "Senior Consultant Dermatologist",
            experience: "19+ Years Experience",
            experienceNum: 19,
            rating: 4.84,
            reviewCount: 970,
            consultationFee: 1200,
            opdDays: ["Mon", "Tue", "Thu", "Sat"],
            opdTime: "02:00 PM - 05:00 PM",
            room: "Dermatology Suite, Room 304",
            isOnline: true,
            avatar: "https://images.unsplash.com/photo-1594824813572-c2e811c784be?auto=format&fit=crop&w=400&q=80",
            bio: "Renowned dermatologist specializing in pigmentary disorders, psoriasis, skin allergies, and advanced laser therapies."
        },

        // Max Saket Doctors (hosp-3)
        {
            id: "dr-11",
            hospitalId: "hosp-3",
            hospitalName: "Max Super Speciality Hospital (Saket)",
            name: "Dr. Balbir Singh",
            qualification: "MD, DM (Cardio), FACC",
            specialty: "Cardiology & Electrophysiology",
            designation: "Chairman, Cardiac Sciences",
            experience: "29+ Years Experience",
            experienceNum: 29,
            rating: 4.97,
            reviewCount: 2150,
            consultationFee: 2200,
            opdDays: ["Mon", "Wed", "Fri"],
            opdTime: "10:30 AM - 02:30 PM",
            room: "Max Heart Centre, Room 101",
            isOnline: true,
            avatar: "https://images.unsplash.com/photo-1537368910025-700350fe46c7?auto=format&fit=crop&w=400&q=80",
            bio: "Padma Shri awardee, premier cardiac electrophysiologist, and specialist in pacemaker implants, CRT, and catheter ablation."
        },
        {
            id: "dr-12",
            hospitalId: "hosp-3",
            hospitalName: "Max Super Speciality Hospital (Saket)",
            name: "Dr. Shalih Kapoor",
            qualification: "MPT (Sports Rehab), MIAP",
            specialty: "Physiotherapy & Sports Rehab",
            designation: "Chief Physiotherapist, MoveOn Lab",
            experience: "15+ Years Experience",
            experienceNum: 15,
            rating: 4.86,
            reviewCount: 780,
            consultationFee: 900,
            opdDays: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat"],
            opdTime: "08:30 AM - 01:00 PM",
            room: "Rehab Pavilion, Ground Floor",
            isOnline: true,
            avatar: "https://images.unsplash.com/photo-1622253692010-333f2da6031d?auto=format&fit=crop&w=400&q=80",
            bio: "High-performance sports physiotherapist guiding patients through post-operative ACL ligament recovery and joint mobility."
        },
        {
            id: "dr-13",
            hospitalId: "hosp-3",
            hospitalName: "Max Super Speciality Hospital (Saket)",
            name: "Dr. Anuradha Kapur",
            qualification: "MD, FICOG (Obstetrics & Gynae)",
            specialty: "Obstetrics & Gynecology",
            designation: "Senior Director, Women's Health",
            experience: "22+ Years Experience",
            experienceNum: 22,
            rating: 4.90,
            reviewCount: 1650,
            consultationFee: 1400,
            opdDays: ["Mon", "Wed", "Sat"],
            opdTime: "09:00 AM - 01:00 PM",
            room: "Mother & Child Wing, Room 210",
            isOnline: true,
            avatar: "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?auto=format&fit=crop&w=400&q=80",
            bio: "Expert in high-risk obstetrics, laparoscopic gynecological surgery, and prenatal maternal health."
        },
        {
            id: "dr-14",
            hospitalId: "hosp-3",
            hospitalName: "Max Super Speciality Hospital (Saket)",
            name: "Dr. Anant Kumar",
            qualification: "MS, MCh (Urology), DNB",
            specialty: "Urology & Robotic Surgery",
            designation: "Chairman, Urology & Kidney Transplant",
            experience: "27+ Years Experience",
            experienceNum: 27,
            rating: 4.93,
            reviewCount: 1400,
            consultationFee: 1700,
            opdDays: ["Tue", "Thu"],
            opdTime: "11:00 AM - 03:00 PM",
            room: "Renal Sciences Wing, Room 301",
            isOnline: false,
            avatar: "https://images.unsplash.com/photo-1582750433449-648ed127bb54?auto=format&fit=crop&w=400&q=80",
            bio: "Pioneer in robotic urological surgery, laparoscopic donor nephrectomy, and kidney transplantation with over 3,500 procedures."
        },
        {
            id: "dr-15",
            hospitalId: "hosp-3",
            hospitalName: "Max Super Speciality Hospital (Saket)",
            name: "Dr. Vivek Raj",
            qualification: "MD, FRCP (Gastroenterology)",
            specialty: "Gastroenterology & Hepatology",
            designation: "Director, Digestive Diseases",
            experience: "20+ Years Experience",
            experienceNum: 20,
            rating: 4.88,
            reviewCount: 1100,
            consultationFee: 1350,
            opdDays: ["Mon", "Tue", "Thu", "Fri"],
            opdTime: "10:00 AM - 02:00 PM",
            room: "Digestive Diseases OPD, Room 105",
            isOnline: true,
            avatar: "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?auto=format&fit=crop&w=400&q=80",
            bio: "Expert gastroenterologist specializing in therapeutic endoscopy, fatty liver disease, irritable bowel syndrome, and acid reflux management."
        },

        // Fortis Gurugram Doctors (hosp-4)
        {
            id: "dr-16",
            hospitalId: "hosp-4",
            hospitalName: "Fortis Memorial Research Institute (FMRI)",
            name: "Dr. Ashok Seth",
            qualification: "FRCP (London), FACC, FSCAI",
            specialty: "Interventional Cardiology",
            designation: "Chairman, Fortis Escorts Heart Institute",
            experience: "31+ Years Experience",
            experienceNum: 31,
            rating: 4.98,
            reviewCount: 2800,
            consultationFee: 2400,
            opdDays: ["Mon", "Thu"],
            opdTime: "10:00 AM - 02:00 PM",
            room: "Heart Suite, Room 501",
            isOnline: true,
            avatar: "https://images.unsplash.com/photo-1537368910025-700350fe46c7?auto=format&fit=crop&w=400&q=80",
            bio: "Padma Bhushan awardee and world authority on complex coronary angioplasty, bioabsorbable stents, and TAVI heart procedures."
        },
        {
            id: "dr-17",
            hospitalId: "hosp-4",
            hospitalName: "Fortis Memorial Research Institute (FMRI)",
            name: "Dr. Vinod Raina",
            qualification: "MD, FRCP, DNB (Medical Oncology)",
            specialty: "Medical Oncology & Bone Marrow",
            designation: "Executive Director, Cancer Care",
            experience: "26+ Years Experience",
            experienceNum: 26,
            rating: 4.91,
            reviewCount: 1350,
            consultationFee: 1900,
            opdDays: ["Tue", "Fri"],
            opdTime: "09:30 AM - 01:30 PM",
            room: "Cancer Pavilion, Room 202",
            isOnline: true,
            avatar: "https://images.unsplash.com/photo-1582750433449-648ed127bb54?auto=format&fit=crop&w=400&q=80",
            bio: "Leading clinical oncologist who performed India's first peripheral blood stem cell transplant; expert in chemotherapy & immunotherapy."
        },
        {
            id: "dr-18",
            hospitalId: "hosp-4",
            hospitalName: "Fortis Memorial Research Institute (FMRI)",
            name: "Dr. Sandeep Vaishya",
            qualification: "MS, MCh (Neurosurgery), Herbert Krause Medal",
            specialty: "CyberKnife Robotic Radiosurgery",
            designation: "Executive Director, Neurosurgery",
            experience: "22+ Years Experience",
            experienceNum: 22,
            rating: 4.92,
            reviewCount: 1190,
            consultationFee: 1800,
            opdDays: ["Mon", "Tue", "Wed", "Thu", "Fri"],
            opdTime: "11:00 AM - 04:00 PM",
            room: "CyberKnife Centre, Room 102",
            isOnline: true,
            avatar: "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?auto=format&fit=crop&w=400&q=80",
            bio: "Specialist in non-invasive CyberKnife robotic radiation for intracranial tumors, trigeminal neuralgia, and arteriovenous malformations."
        },
        {
            id: "dr-19",
            hospitalId: "hosp-4",
            hospitalName: "Fortis Memorial Research Institute (FMRI)",
            name: "Dr. Subhash Gupta",
            qualification: "MS, FRCS (Edin), FRCS (Glasg)",
            specialty: "Liver Transplant & Hepatobiliary Surgery",
            designation: "Chairman, Centre for Liver Sciences",
            experience: "21+ Years Experience",
            experienceNum: 21,
            rating: 4.89,
            reviewCount: 930,
            consultationFee: 2000,
            opdDays: ["Wed", "Sat"],
            opdTime: "09:00 AM - 01:00 PM",
            room: "Organ Transplant Wing, Room 404",
            isOnline: false,
            avatar: "https://images.unsplash.com/photo-1622253692010-333f2da6031d?auto=format&fit=crop&w=400&q=80",
            bio: "Global pioneer in living donor liver transplantation with more than 3,000 successful complex hepatobiliary procedures."
        },
        {
            id: "dr-20",
            hospitalId: "hosp-4",
            hospitalName: "Fortis Memorial Research Institute (FMRI)",
            name: "Dr. Meenakshi Ahuja",
            qualification: "MD, DNB (Endocrinology), FRCOG",
            specialty: "Diabetes & Endocrinology",
            designation: "Senior Consultant, Metabolic Health",
            experience: "16+ Years Experience",
            experienceNum: 16,
            rating: 4.84,
            reviewCount: 780,
            consultationFee: 1100,
            opdDays: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat"],
            opdTime: "09:30 AM - 01:30 PM",
            room: "Metabolic OPD, Room 107",
            isOnline: true,
            avatar: "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?auto=format&fit=crop&w=400&q=80",
            bio: "Specialist in holistic diabetes reversal programs, thyroid disorders, insulin pump management, and metabolic wellness."
        },

        // Medanta Doctors (hosp-5)
        {
            id: "dr-21",
            hospitalId: "hosp-5",
            hospitalName: "Medanta - The Medicity",
            name: "Dr. Naresh Trehan",
            qualification: "MBBS, Diplomate American Board of Surgery",
            specialty: "Chief Cardiac Surgeon & CMD",
            designation: "Chairman & Managing Director, Medanta",
            experience: "35+ Years Experience",
            experienceNum: 35,
            rating: 4.99,
            reviewCount: 3100,
            consultationFee: 2500,
            opdDays: ["Mon", "Wed"],
            opdTime: "11:00 AM - 03:00 PM",
            room: "Heart Institute Board Suite",
            isOnline: true,
            avatar: "https://images.unsplash.com/photo-1537368910025-700350fe46c7?auto=format&fit=crop&w=400&q=80",
            bio: "Padma Bhushan & Padma Shri recipient; performed over 48,000 open-heart surgeries; world-renowned cardiovascular surgeon."
        },
        {
            id: "dr-22",
            hospitalId: "hosp-5",
            hospitalName: "Medanta - The Medicity",
            name: "Dr. Arvinder Singh Soin",
            qualification: "FRCS (Glasg), MS, MBBS",
            specialty: "Chief Liver Transplant Surgeon",
            designation: "Chairman, Medanta Liver Institute",
            experience: "26+ Years Experience",
            experienceNum: 26,
            rating: 4.97,
            reviewCount: 1620,
            consultationFee: 2200,
            opdDays: ["Tue", "Thu"],
            opdTime: "10:00 AM - 02:00 PM",
            room: "Liver Clinic, Suite 601",
            isOnline: true,
            avatar: "https://images.unsplash.com/photo-1582750433449-648ed127bb54?auto=format&fit=crop&w=400&q=80",
            bio: "Pioneered living donor liver transplants in India with a success rate exceeding 95%; led more than 3,500 liver transplants."
        },
        {
            id: "dr-23",
            hospitalId: "hosp-5",
            hospitalName: "Medanta - The Medicity",
            name: "Dr. Yatin Mehta",
            qualification: "MD, FRCA, FAMS (Critical Care)",
            specialty: "Critical Care & Anesthesiology",
            designation: "Chairman, Institute of Critical Care",
            experience: "29+ Years Experience",
            experienceNum: 29,
            rating: 4.92,
            reviewCount: 1140,
            consultationFee: 1500,
            opdDays: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat"],
            opdTime: "08:30 AM - 01:00 PM",
            room: "ICU Complex 3",
            isOnline: true,
            avatar: "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?auto=format&fit=crop&w=400&q=80",
            bio: "Leading intensivist specializing in ECMO life support, advanced mechanical ventilation, and multi-organ emergency recovery."
        },
        {
            id: "dr-24",
            hospitalId: "hosp-5",
            hospitalName: "Medanta - The Medicity",
            name: "Dr. Praveen Chandra",
            qualification: "MD, DM (Cardio), FACC",
            specialty: "Structural Heart & TAVI",
            designation: "Chairman, Interventional Cardiology",
            experience: "23+ Years Experience",
            experienceNum: 23,
            rating: 4.90,
            reviewCount: 1350,
            consultationFee: 1900,
            opdDays: ["Mon", "Fri"],
            opdTime: "11:00 AM - 04:00 PM",
            room: "Heart OPD 4",
            isOnline: false,
            avatar: "https://images.unsplash.com/photo-1622253692010-333f2da6031d?auto=format&fit=crop&w=400&q=80",
            bio: "Padma Shri awardee and foremost expert in transcatheter aortic valve implantation (TAVI/TAVR) and complex percutaneous interventions."
        },
        {
            id: "dr-25",
            hospitalId: "hosp-5",
            hospitalName: "Medanta - The Medicity",
            name: "Dr. Sushila Kataria",
            qualification: "MD (Internal Medicine), Senior Director",
            specialty: "Internal Medicine & Infectious Diseases",
            designation: "Senior Director, Internal Medicine",
            experience: "20+ Years Experience",
            experienceNum: 20,
            rating: 4.88,
            reviewCount: 1210,
            consultationFee: 1200,
            opdDays: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat"],
            opdTime: "09:00 AM - 02:00 PM",
            room: "Clinic Tower 2, Room 204",
            isOnline: true,
            avatar: "https://images.unsplash.com/photo-1594824813572-c2e811c784be?auto=format&fit=crop&w=400&q=80",
            bio: "Expert in complex febrile illnesses, tropical infections, adult immunizations, and chronic disease coordination."
        }
    ];

    // 5 Demo Patients
    const defaultPatients = [
        {
            id: "pat-1",
            username: "rohan_mehta",
            password: "password123",
            name: "Rohan Mehta",
            age: 28,
            gender: "Male",
            bloodGroup: "B+",
            phone: "+91 98765 43210",
            email: "rohan.mehta@gmail.com",
            address: "Flat 402, Green Glen, New Delhi",
            primaryHospitalId: "hosp-1",
            primaryHospitalName: "AIIMS New Delhi",
            condition: "Post-Op Knee Ligament Surgery Rehab (ACL Reconstruction)",
            recoveryProgress: 65,
            emergencyContact: {
                name: "Sunil Mehta (Father)",
                phone: "+91 98111 00223",
                relation: "Father"
            },
            vitals: {
                heartRate: 72,
                bpSystolic: 120,
                bpDiastolic: 80,
                spo2: 99,
                bloodSugar: 98,
                temperature: 98.4,
                weight: 71,
                lastUpdated: "Today at 08:30 AM"
            },
            avatar: "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&w=200&q=80"
        },
        {
            id: "pat-2",
            username: "priya_sharma",
            password: "password123",
            name: "Priya Sharma",
            age: 34,
            gender: "Female",
            bloodGroup: "O+",
            phone: "+91 98111 22334",
            email: "priya.sharma@outlook.com",
            address: "Block C, Greater Kailash 1, South Delhi",
            primaryHospitalId: "hosp-3",
            primaryHospitalName: "Max Super Speciality Hospital (Saket)",
            condition: "Type 2 Diabetes Management & Dietary Therapy",
            recoveryProgress: 80,
            emergencyContact: {
                name: "Vikram Sharma (Husband)",
                phone: "+91 98222 11994",
                relation: "Husband"
            },
            vitals: {
                heartRate: 76,
                bpSystolic: 118,
                bpDiastolic: 78,
                spo2: 98,
                bloodSugar: 112,
                temperature: 98.6,
                weight: 62,
                lastUpdated: "Yesterday at 06:15 PM"
            },
            avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=200&q=80"
        },
        {
            id: "pat-3",
            username: "rahul_verma",
            password: "password123",
            name: "Rahul Verma",
            age: 45,
            gender: "Male",
            bloodGroup: "A+",
            phone: "+91 98222 33445",
            email: "rahul.verma@techcorp.in",
            address: "Sector 50, Nirvana Country, Gurugram",
            primaryHospitalId: "hosp-5",
            primaryHospitalName: "Medanta - The Medicity",
            condition: "Hypertension & Routine Cardiac Surveillance",
            recoveryProgress: 50,
            emergencyContact: {
                name: "Sunita Verma (Wife)",
                phone: "+91 98333 44881",
                relation: "Wife"
            },
            vitals: {
                heartRate: 82,
                bpSystolic: 135,
                bpDiastolic: 88,
                spo2: 98,
                bloodSugar: 104,
                temperature: 98.5,
                weight: 84,
                lastUpdated: "Today at 07:15 AM"
            },
            avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80"
        },
        {
            id: "pat-4",
            username: "ananya_singh",
            password: "password123",
            name: "Ananya Singh",
            age: 23,
            gender: "Female",
            bloodGroup: "AB+",
            phone: "+91 98333 44556",
            email: "ananya.singh@university.edu",
            address: "Express Park View, Noida",
            primaryHospitalId: "hosp-2",
            primaryHospitalName: "Indraprastha Apollo Hospitals",
            condition: "Chronic Migraine & Cervical Sprain",
            recoveryProgress: 90,
            emergencyContact: {
                name: "Dr. K. P. Singh (Father)",
                phone: "+91 98444 55112",
                relation: "Father"
            },
            vitals: {
                heartRate: 68,
                bpSystolic: 115,
                bpDiastolic: 75,
                spo2: 99,
                bloodSugar: 92,
                temperature: 98.2,
                weight: 54,
                lastUpdated: "2 days ago"
            },
            avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80"
        },
        {
            id: "pat-5",
            username: "amit_kumar",
            password: "password123",
            name: "Amit Kumar",
            age: 52,
            gender: "Male",
            bloodGroup: "O-",
            phone: "+91 98444 55667",
            email: "amit.kumar52@gmail.com",
            address: "House No. 312, Sector 15, Faridabad",
            primaryHospitalId: "hosp-4",
            primaryHospitalName: "Fortis Memorial Research Institute",
            condition: "Chronic Bronchitis & Allergic Asthma",
            recoveryProgress: 40,
            emergencyContact: {
                name: "Deepak Kumar (Son)",
                phone: "+91 98555 66778",
                relation: "Son"
            },
            vitals: {
                heartRate: 78,
                bpSystolic: 128,
                bpDiastolic: 84,
                spo2: 96,
                bloodSugar: 110,
                temperature: 99.1,
                weight: 76,
                lastUpdated: "Today at 09:00 AM"
            },
            avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=200&q=80"
        }
    ];

    // Appointments
    const defaultAppointments = [
        {
            id: "APT-1001",
            patientId: "pat-1",
            patientName: "Rohan Mehta",
            patientPhone: "+91 98765 43210",
            hospitalId: "hosp-1",
            hospitalName: "AIIMS New Delhi",
            doctorId: "dr-5",
            doctorName: "Dr. Rajesh Malhotra",
            specialty: "Orthopedics & Joint Replacement",
            date: "2026-11-04",
            time: "10:30 AM",
            type: "In-Person OPD (Hospital Visit)",
            status: "Confirmed",
            room: "Trauma Centre, Room 402",
            symptoms: "6-week post-op ACL knee reconstruction mobility & strength checkup.",
            fee: 550,
            bookedAt: "2026-10-25"
        },
        {
            id: "APT-1002",
            patientId: "pat-2",
            patientName: "Priya Sharma",
            patientPhone: "+91 98111 22334",
            hospitalId: "hosp-3",
            hospitalName: "Max Super Speciality Hospital (Saket)",
            doctorId: "dr-15",
            doctorName: "Dr. Vivek Raj",
            specialty: "Gastroenterology & Hepatology",
            date: "2026-11-05",
            time: "02:00 PM",
            type: "Online HD Video Call (Telehealth)",
            status: "Scheduled",
            room: "Online Telehealth Suite #MAX-08",
            symptoms: "HbA1c blood sugar panel review & dietary guidance.",
            fee: 1350,
            bookedAt: "2026-10-26"
        },
        {
            id: "APT-1003",
            patientId: "pat-3",
            patientName: "Rahul Verma",
            patientPhone: "+91 98222 33445",
            hospitalId: "hosp-5",
            hospitalName: "Medanta - The Medicity",
            doctorId: "dr-21",
            doctorName: "Dr. Naresh Trehan",
            specialty: "Chief Cardiac Surgeon & CMD",
            date: "2026-11-06",
            time: "11:00 AM",
            type: "In-Person OPD (Hospital Visit)",
            status: "Confirmed",
            room: "Heart Institute Board Suite",
            symptoms: "Echocardiogram cardiac review & Holter monitoring assessment.",
            fee: 2500,
            bookedAt: "2026-10-27"
        },
        {
            id: "APT-1004",
            patientId: "pat-4",
            patientName: "Ananya Singh",
            patientPhone: "+91 98333 44556",
            hospitalId: "hosp-2",
            hospitalName: "Indraprastha Apollo Hospitals",
            doctorId: "dr-9",
            doctorName: "Dr. Alok Sharma",
            specialty: "Neurosurgery & Spine",
            date: "2026-10-20",
            time: "03:30 PM",
            type: "In-Person OPD (Hospital Visit)",
            status: "Completed",
            room: "Neuro Block, Room 202",
            symptoms: "MRI Brain review for migraine headache management.",
            fee: 1800,
            bookedAt: "2026-10-15"
        },
        {
            id: "APT-1005",
            patientId: "pat-5",
            patientName: "Amit Kumar",
            patientPhone: "+91 98444 55667",
            hospitalId: "hosp-4",
            hospitalName: "Fortis Memorial Research Institute",
            doctorId: "dr-16",
            doctorName: "Dr. Ashok Seth",
            specialty: "Interventional Cardiology",
            date: "2026-11-07",
            time: "12:00 PM",
            type: "In-Person OPD (Hospital Visit)",
            status: "Scheduled",
            room: "Heart Suite, Room 501",
            symptoms: "Exertional chest heaviness & shortness of breath evaluation.",
            fee: 2400,
            bookedAt: "2026-10-27"
        }
    ];

    // Health Records (EHR)
    const defaultRecords = [
        {
            id: "REC-201",
            patientId: "pat-1",
            title: "Knee MRI & Digital High-Resolution X-Ray",
            category: "X-Ray & Scans",
            hospital: "AIIMS New Delhi",
            doctor: "Dr. Rajesh Malhotra",
            date: "18 Oct 2026",
            size: "4.8 MB",
            fileType: "pdf",
            status: "Verified",
            summary: "ACL graft integration shows excellent vascularization. Joint effusion significantly reduced. Continue daily active rehabilitation."
        },
        {
            id: "REC-202",
            patientId: "pat-1",
            title: "Comprehensive Blood Panel (CBC, LFT, KFT)",
            category: "Blood & Urine Tests",
            hospital: "AIIMS Central Pathology Lab",
            doctor: "Dr. Randeep Guleria",
            date: "10 Oct 2026",
            size: "1.2 MB",
            fileType: "pdf",
            status: "Normal",
            summary: "Hemoglobin (14.6 g/dL), Platelets, Liver and Renal parameters are all well within optimal reference ranges."
        },
        {
            id: "REC-203",
            patientId: "pat-1",
            title: "Physiotherapy & Rehabilitation Prescription (Rx)",
            category: "Doctor Prescription (Rx)",
            hospital: "Max Super Speciality Hospital (Saket)",
            doctor: "Dr. Shalih Kapoor",
            date: "02 Oct 2026",
            size: "650 KB",
            fileType: "pdf",
            status: "Active",
            summary: "Phase 3 Protocol: Straight leg raises, stationary cycling (15 mins), and hamstring curls with progressive resistance."
        },
        {
            id: "REC-204",
            patientId: "pat-2",
            title: "3-Month Glycemic Panel (HbA1c & Fasting Glucose)",
            category: "Blood & Urine Tests",
            hospital: "Max Central Diagnostic Lab",
            doctor: "Dr. Vivek Raj",
            date: "22 Oct 2026",
            size: "890 KB",
            fileType: "pdf",
            status: "Improved (6.4%)",
            summary: "HbA1c improved from 7.1% to 6.4%. Fasting blood glucose is 102 mg/dL. Continue low glycemic diet and oral metformin."
        },
        {
            id: "REC-205",
            patientId: "pat-3",
            title: "2D Echocardiogram & Color Doppler Report",
            category: "Heart Checkup",
            hospital: "Medanta Heart Institute",
            doctor: "Dr. Naresh Trehan",
            date: "14 Oct 2026",
            size: "3.4 MB",
            fileType: "pdf",
            status: "Verified",
            summary: "Left ventricular ejection fraction (LVEF) is 62%. Normal wall motion and healthy valvular hemodynamics."
        }
    ];

    // Invoices
    const defaultInvoices = [
        {
            id: "INV-2026-081",
            patientId: "pat-1",
            patientName: "Rohan Mehta",
            hospital: "AIIMS New Delhi",
            description: "Orthopedics OPD Consultation + Digital Knee X-Ray",
            date: "18 Oct 2026",
            subtotal: 1050,
            tax: 0,
            discount: 100,
            total: 950,
            status: "Paid",
            method: "UPI (Google Pay)"
        },
        {
            id: "INV-2026-082",
            patientId: "pat-1",
            patientName: "Rohan Mehta",
            hospital: "Max Super Speciality Hospital (Saket)",
            description: "Sports Physiotherapy Rehab (5-Session Package)",
            date: "05 Oct 2026",
            subtotal: 4500,
            tax: 225,
            discount: 500,
            total: 4225,
            status: "Paid",
            method: "HDFC Credit Card"
        },
        {
            id: "INV-2026-083",
            patientId: "pat-2",
            patientName: "Priya Sharma",
            hospital: "Max Super Speciality Hospital (Saket)",
            description: "Endocrinology Consultation + Lipid Profile Panel",
            date: "22 Oct 2026",
            subtotal: 2800,
            tax: 140,
            discount: 0,
            total: 2940,
            status: "Paid",
            method: "Net Banking"
        }
    ];

    function loadData() {
        const stored = localStorage.getItem(STORAGE_KEY_DATA);
        if (stored) {
            try {
                return JSON.parse(stored);
            } catch (e) {
                console.error("Data load failed, resetting...", e);
            }
        }
        const initial = {
            hospitals: defaultHospitals,
            doctors: defaultDoctors,
            patients: defaultPatients,
            appointments: defaultAppointments,
            records: defaultRecords,
            invoices: defaultInvoices
        };
        saveData(initial);
        return initial;
    }

    function saveData(data) {
        localStorage.setItem(STORAGE_KEY_DATA, JSON.stringify(data));
    }

    // Session Management
    function getSession() {
        const stored = localStorage.getItem(STORAGE_KEY_SESSION);
        if (stored) {
            try {
                return JSON.parse(stored);
            } catch (e) {
                console.error("Session load failed", e);
            }
        }
        const defaultSession = {
            role: "admin",
            userId: "admin-manish",
            username: "manish_admin",
            displayName: "Manish Pandey (Super Pro Admin)",
            title: "Founder & Apex Super Pro Admin",
            avatar: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=200&q=80"
        };
        setSession(defaultSession);
        return defaultSession;
    }

    function setSession(session) {
        localStorage.setItem(STORAGE_KEY_SESSION, JSON.stringify(session));
        if (session.displayName) {
            localStorage.setItem("patientName", session.displayName);
        }
    }

    function clearSession() {
        localStorage.removeItem(STORAGE_KEY_SESSION);
        localStorage.removeItem("patientName");
    }

    // Public API
    window.SwastikData = {
        getData: loadData,
        saveData: saveData,
        getSession: getSession,
        setSession: setSession,
        clearSession: clearSession,

        // 1-Click Persona Switcher
        switchPersona: function (role, id) {
            const data = loadData();
            if (role === "patient") {
                const patient = data.patients.find(p => p.id === id) || data.patients[0];
                setSession({
                    role: "patient",
                    userId: patient.id,
                    username: patient.username,
                    displayName: patient.name,
                    hospitalId: patient.primaryHospitalId,
                    avatar: patient.avatar
                });
            } else if (role === "hospital") {
                const hospital = data.hospitals.find(h => h.id === id || h.code === id) || data.hospitals[0];
                setSession({
                    role: "hospital",
                    userId: hospital.id,
                    username: hospital.code,
                    displayName: hospital.name + " (Staff)",
                    hospitalId: hospital.id,
                    hospitalCode: hospital.code,
                    avatar: null,
                    badge: hospital.logoBadge
                });
            } else if (role === "admin") {
                setSession({
                    role: "admin",
                    userId: "admin-manish",
                    username: "manish_admin",
                    displayName: "Manish Pandey (Super Pro Admin)",
                    title: "Founder & Apex Super Pro Admin",
                    avatar: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=200&q=80"
                });
            }
            window.location.reload();
        },

        getHospital: function (id) {
            const data = loadData();
            return data.hospitals.find(h => h.id === id || h.code === id);
        },

        getDoctorsByHospital: function (hospitalId) {
            const data = loadData();
            return data.doctors.filter(d => d.hospitalId === hospitalId);
        },

        getDoctor: function (id) {
            const data = loadData();
            return data.doctors.find(d => d.id === id);
        },

        getPatient: function (id) {
            const data = loadData();
            return data.patients.find(p => p.id === id);
        },

        // Book New Appointment
        bookAppointment: function (booking) {
            const data = loadData();
            const newApt = {
                id: "APT-" + Math.floor(1000 + Math.random() * 9000),
                bookedAt: new Date().toISOString().split("T")[0],
                status: "Confirmed",
                ...booking
            };
            data.appointments.unshift(newApt);
            saveData(data);
            return newApt;
        },

        // Update Appointment Status
        updateAppointmentStatus: function (aptId, newStatus) {
            const data = loadData();
            const target = data.appointments.find(a => a.id === aptId);
            if (target) {
                target.status = newStatus;
                saveData(data);
                return true;
            }
            return false;
        },

        // Add Medical Record
        addRecord: function (record) {
            const data = loadData();
            const newRec = {
                id: "REC-" + Math.floor(100 + Math.random() * 900),
                date: new Date().toLocaleDateString('en-US', { day: 'numeric', month: 'short', year: 'numeric' }),
                status: "Verified",
                ...record
            };
            data.records.unshift(newRec);
            saveData(data);
            return newRec;
        },

        // Update Patient Vitals
        updateVitals: function (patientId, newVitals) {
            const data = loadData();
            const pat = data.patients.find(p => p.id === patientId);
            if (pat) {
                pat.vitals = { ...pat.vitals, ...newVitals, lastUpdated: "Just now" };
                saveData(data);
                return pat.vitals;
            }
            return null;
        },

        // Update Bed Occupancy
        updateHospitalBeds: function (hospitalId, deltaOccupied) {
            const data = loadData();
            const hosp = data.hospitals.find(h => h.id === hospitalId);
            if (hosp) {
                hosp.bedsOccupied = Math.max(0, Math.min(hosp.bedsTotal, hosp.bedsOccupied + deltaOccupied));
                hosp.bedsAvailable = hosp.bedsTotal - hosp.bedsOccupied;
                saveData(data);
                return hosp;
            }
            return null;
        }
    };

    loadData();
})();