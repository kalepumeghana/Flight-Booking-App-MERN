import express from 'express';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import cors from 'cors';
import bcrypt from 'bcrypt';
import { User, Booking, Flight } from './schemas.js';

const app = express();
const PORT = 6001;

/* ======================
      Middleware
====================== */
app.use(cors());
app.use(express.json());
app.use(bodyParser.json({ limit: "30mb", extended: true }));
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }));

/* ======================
        USER ROUTES
====================== */

/* ---------- Register ---------- */
app.post('/register', async (req, res) => {
    const { username, email, usertype, password } = req.body;
    let approval = 'approved';

    try {
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: 'User already exists' });
        }

        // Flight operator needs approval
        if (usertype === 'flight-operator') {
            approval = 'not-approved';
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const newUser = new User({
            username,
            email,
            usertype,
            password: hashedPassword,
            approval
        });

        const savedUser = await newUser.save();

        // IMPORTANT: Send data needed by frontend
        res.status(201).json({
            userId: savedUser._id,
            username: savedUser.username,
            userType: savedUser.usertype,
            email: savedUser.email
        });

    } catch (error) {
        console.log(error);
        res.status(500).json({ message: 'Server Error' });
    }
});


/* ---------- Login ---------- */
app.post('/login', async (req, res) => {
    const { email, password } = req.body;

    console.log("Login attempt:", email);

    try {
        const user = await User.findOne({ email });

        if (!user) {
            return res.status(401).json({ message: 'User not found' });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        console.log("Password match:", isMatch);

        if (!isMatch) {
            return res.status(401).json({ message: 'Wrong password' });
        }

        // Operator approval check
        if (user.usertype === 'flight-operator' && user.approval !== 'approved') {
            return res.status(403).json({ message: 'Operator not approved yet' });
        }

        res.json({
            message: "Login successful",
            userId: user._id,
            username: user.username,
            userType: user.usertype,
            email: user.email
        });

    } catch (error) {
        console.log(error);
        res.status(500).json({ message: 'Server Error' });
    }
});


/* ---------- Reset Password ---------- */
app.post('/reset-password', async (req, res) => {
    const { email, newPassword } = req.body;

    try {
        const user = await User.findOne({ email });

        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        const hashedPassword = await bcrypt.hash(newPassword, 10);

        user.password = hashedPassword;
        await user.save();

        res.json({ message: "Password reset successful" });

    } catch (error) {
        console.log(error);
        res.status(500).json({ message: 'Server Error' });
    }
});


/* ---------- Fetch user by ID ---------- */
app.get('/fetch-user/:id', async (req, res) => {
    try {
        const user = await User.findById(req.params.id);

        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        res.json(user);
    } catch (err) {
        console.log(err);
        res.status(500).json({ message: "Error fetching user" });
    }
});


/* ---------- Fetch all users ---------- */
app.get('/fetch-users', async (req, res) => {
    try {
        const users = await User.find();
        res.json(users);
    } catch (err) {
        console.log(err);
        res.status(500).json({ message: "Error fetching users" });
    }
});


/* ---------- Approve operator ---------- */
app.post('/approve-operator', async (req, res) => {
    const { id } = req.body;

    try {
        const user = await User.findById(id);

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        user.approval = 'approved';
        await user.save();

        res.json({ message: 'Operator approved' });
    } catch (error) {
        res.status(500).json({ message: 'Error approving operator' });
    }
});


/* ---------- Reject operator ---------- */
app.post('/reject-operator', async (req, res) => {
    const { id } = req.body;

    try {
        const user = await User.findById(id);

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        user.approval = 'rejected';
        await user.save();

        res.json({ message: 'Operator rejected' });
    } catch (error) {
        res.status(500).json({ message: 'Error rejecting operator' });
    }
});


/* ======================
        FLIGHTS
====================== */

// Add flight
app.post('/add-flight', async (req, res) => {
    try {
        const flight = new Flight(req.body);
        await flight.save();
        res.json({ message: 'Flight added successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Error adding flight' });
    }
});

// Fetch flights
app.get('/fetch-flights', async (req, res) => {
    try {
        const flights = await Flight.find();
        res.json(flights);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching flights' });
    }
});

// Delete flight
app.delete('/delete-flight/:id', async (req, res) => {
    try {
        await Flight.findByIdAndDelete(req.params.id);
        res.json({ message: 'Flight deleted' });
    } catch (error) {
        res.status(500).json({ message: 'Error deleting flight' });
    }
});


/* ======================
        BOOKINGS
====================== */

// Fetch all bookings (Admin)
app.get('/fetch-bookings', async (req, res) => {
    try {
        const bookings = await Booking.find();
        res.json(bookings);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching bookings' });
    }
});

// Fetch bookings by user
app.get('/fetch-bookings/:userId', async (req, res) => {
    try {
        const bookings = await Booking.find({ user: req.params.userId });
        res.json(bookings);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching user bookings' });
    }
});

// Book ticket
app.post('/book-ticket', async (req, res) => {
    try {
        const booking = new Booking({
            ...req.body,
            status: 'confirmed'
        });

        await booking.save();
        res.json({ message: 'Booking successful' });
    } catch (error) {
        res.status(500).json({ message: 'Error booking ticket' });
    }
});

// Cancel ticket
app.put('/cancel-ticket/:id', async (req, res) => {
    try {
        const booking = await Booking.findById(req.params.id);

        if (!booking) {
            return res.status(404).json({ message: 'Booking not found' });
        }

        booking.status = 'cancelled';
        await booking.save();

        res.json({ message: 'Booking cancelled' });
    } catch (error) {
        res.status(500).json({ message: 'Error cancelling ticket' });
    }
});


/* ======================
      DATABASE
====================== */

mongoose.connect("mongodb://127.0.0.1:27017/FlightBookingMERN")
.then(() => {
    console.log("MongoDB Connected");
    app.listen(PORT, () => {
        console.log(`Server running on port ${PORT}`);
    });
})
.catch(err => console.log(err));