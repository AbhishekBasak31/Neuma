import bcrypt from "bcrypt";
import { HomeBanner } from "../../Models/HomePage/Banner.js";
import { HomeAbout } from "../../Models/HomePage/About.js";
import { HomeSpecialItems } from "../../Models/HomePage/SpecialItems.js";
import { EventSec } from "../../Models/Global/EventSec.js";
import { Event } from "../../Models/Global/Event.js";
import { EventPartner } from "../../Models/Global/EventPartners.js";
import { GallerySec } from "../../Models/Global/GallerySec.js";
import { GalleryVedio } from "../../Models/Global/GalleryVideo.js";
import { ResturantSpace } from "../../Models/HomePage/ResturantSpace.js";
import { ReviewSection } from "../../Models/HomePage/ReviewSection.js";
import { SocialMediamarketSec } from "../../Models/HomePage/SocialMediamarket.js";
import { ContactDetails } from "../../Models/Global/ContactDetails.js";
import { Footer } from "../../Models/Global/Footer.js";
import { Social } from "../../Models/Global/Social.js";
import { QuickLinks } from "../../Models/Global/QuickLinks.js";
import { Contact } from "../../Models/Global/Contact.js";
import { Booking } from "../../Models/Global/Bookings.js";
import { User } from "../../Models/Global/User.js";

const isProd = process.env.NODE_ENV === "production";

export const resolvers = {
  Query: {
    getHomeBanners: async () => await HomeBanner.find(),
    getHomeBannerById: async (_, { id }) => await HomeBanner.findById(id),
    getHomeAbouts: async () => await HomeAbout.find(),
    getHomeAboutById: async (_, { id }) => await HomeAbout.findById(id),
    getHomeSpecialItems: async () => await HomeSpecialItems.find(),
    getHomeSpecialItemById: async (_, { id }) => await HomeSpecialItems.findById(id),
    
    getEventSecs: async () => await EventSec.find(),
    getEventSecById: async (_, { id }) => await EventSec.findById(id),
    getEvents: async () => await Event.find(),
    getEventById: async (_, { id }) => await Event.findById(id),
    getEventPartners: async () => await EventPartner.find(),
    getEventPartnerById: async (_, { id }) => await EventPartner.findById(id),
    
    getGallerySecs: async () => await GallerySec.find(),
    getGallerySecById: async (_, { id }) => await GallerySec.findById(id),
    getGalleryVedios: async () => await GalleryVedio.find(),
    getGalleryVedioById: async (_, { id }) => await GalleryVedio.findById(id),
    
    getResturantSpaces: async () => await ResturantSpace.find(),
    getResturantSpaceById: async (_, { id }) => await ResturantSpace.findById(id),
    getReviewSections: async () => await ReviewSection.find(),
    getReviewSectionById: async (_, { id }) => await ReviewSection.findById(id),
    
    getSocialMediamarketSecs: async () => await SocialMediamarketSec.find(),
    getSocialMediamarketSecById: async (_, { id }) => await SocialMediamarketSec.findById(id),
    getContactDetails: async () => await ContactDetails.find(),
    getContactDetailById: async (_, { id }) => await ContactDetails.findById(id),
    
    getFooters: async () => await Footer.find(),
    getFooterById: async (_, { id }) => await Footer.findById(id),
    getSocials: async () => await Social.find(),
    getSocialById: async (_, { id }) => await Social.findById(id),
    getQuickLinks: async () => await QuickLinks.find(),
    getQuickLinkById: async (_, { id }) => await QuickLinks.findById(id),

    getContacts: async () => await Contact.find().sort({ createdAt: -1 }),
    getContactById: async (_, { id }) => await Contact.findById(id),
    getBookings: async () => await Booking.find().sort({ createdAt: -1 }),
    getBookingById: async (_, { id }) => await Booking.findById(id),

    getMe: async (_, __, context) => {
      if (!context.user) throw new Error("Unauthorized");
      return await User.findById(context.user.id).select("-password");
    },
    getUsers: async () => await User.find().select("-password"),
  },

  Mutation: {
    createHomeBanner: async (_, args) => await new HomeBanner(args).save(),
    updateHomeBanner: async (_, { id, ...updates }) => await HomeBanner.findByIdAndUpdate(id, { $set: updates }, { new: true }),
    deleteHomeBanner: async (_, { id }) => { await HomeBanner.findByIdAndDelete(id); return "Deleted"; },

    createHomeAbout: async (_, args) => await new HomeAbout(args).save(),
    updateHomeAbout: async (_, { id, ...updates }) => await HomeAbout.findByIdAndUpdate(id, { $set: updates }, { new: true }),
    deleteHomeAbout: async (_, { id }) => { await HomeAbout.findByIdAndDelete(id); return "Deleted"; },

    createHomeSpecialItems: async (_, args) => await new HomeSpecialItems(args).save(),
    updateHomeSpecialItems: async (_, { id, ...updates }) => await HomeSpecialItems.findByIdAndUpdate(id, { $set: updates }, { new: true }),
    deleteHomeSpecialItems: async (_, { id }) => { await HomeSpecialItems.findByIdAndDelete(id); return "Deleted"; },

    createEventSec: async (_, args) => await new EventSec(args).save(),
    updateEventSec: async (_, { id, ...updates }) => await EventSec.findByIdAndUpdate(id, { $set: updates }, { new: true }),
    deleteEventSec: async (_, { id }) => { await EventSec.findByIdAndDelete(id); return "Deleted"; },

   createEvent: async (_, args) => {
      // 1. We pass the raw args (which have NO slug) into the Mongoose model
      const newEvent = new Event(args);
      
      // 2. When we call .save(), your Mongoose pre("save") hook catches it, 
      // looks at the title, generates the slug, and saves it to the database!
      return await newEvent.save();
    },
    updateEvent: async (_, { id, ...updates }) => {
      // Best Practice: We do NOT update the slug when updating an event.
      // If you change a live URL later, it breaks SEO and user bookmarks.
      return await Event.findByIdAndUpdate(
        id, 
        { $set: updates }, 
        { new: true }
      );
    },
  deleteEvent: async (_, { id }) => { 
      await Event.findByIdAndDelete(id); 
      return "Deleted"; 
    },

    createEventPartner: async (_, args) => await new EventPartner(args).save(),
    updateEventPartner: async (_, { id, ...updates }) => await EventPartner.findByIdAndUpdate(id, { $set: updates }, { new: true }),
    deleteEventPartner: async (_, { id }) => { await EventPartner.findByIdAndDelete(id); return "Deleted"; },

    createGallerySec: async (_, args) => await new GallerySec(args).save(),
    updateGallerySec: async (_, { id, ...updates }) => await GallerySec.findByIdAndUpdate(id, { $set: updates }, { new: true }),
    deleteGallerySec: async (_, { id }) => { await GallerySec.findByIdAndDelete(id); return "Deleted"; },

    createGalleryVedio: async (_, args) => await new GalleryVedio(args).save(),
    updateGalleryVedio: async (_, { id, ...updates }) => await GalleryVedio.findByIdAndUpdate(id, { $set: updates }, { new: true }),
    deleteGalleryVedio: async (_, { id }) => { await GalleryVedio.findByIdAndDelete(id); return "Deleted"; },

    createResturantSpace: async (_, args) => await new ResturantSpace(args).save(),
    updateResturantSpace: async (_, { id, ...updates }) => await ResturantSpace.findByIdAndUpdate(id, { $set: updates }, { new: true }),
    deleteResturantSpace: async (_, { id }) => { await ResturantSpace.findByIdAndDelete(id); return "Deleted"; },

    createReviewSection: async (_, args) => await new ReviewSection(args).save(),
    updateReviewSection: async (_, { id, ...updates }) => await ReviewSection.findByIdAndUpdate(id, { $set: updates }, { new: true }),
    deleteReviewSection: async (_, { id }) => { await ReviewSection.findByIdAndDelete(id); return "Deleted"; },

    createSocialMediamarketSec: async (_, args) => await new SocialMediamarketSec(args).save(),
    updateSocialMediamarketSec: async (_, { id, ...updates }) => await SocialMediamarketSec.findByIdAndUpdate(id, { $set: updates }, { new: true }),
    deleteSocialMediamarketSec: async (_, { id }) => { await SocialMediamarketSec.findByIdAndDelete(id); return "Deleted"; },

    createContactDetails: async (_, args) => await new ContactDetails(args).save(),
    updateContactDetails: async (_, { id, ...updates }) => await ContactDetails.findByIdAndUpdate(id, { $set: updates }, { new: true }),
    deleteContactDetails: async (_, { id }) => { await ContactDetails.findByIdAndDelete(id); return "Deleted"; },

    createFooter: async (_, args) => await new Footer(args).save(),
    updateFooter: async (_, { id, ...updates }) => await Footer.findByIdAndUpdate(id, { $set: updates }, { new: true }),
    deleteFooter: async (_, { id }) => { await Footer.findByIdAndDelete(id); return "Deleted"; },

    createSocial: async (_, args) => await new Social(args).save(),
    updateSocial: async (_, { id, ...updates }) => await Social.findByIdAndUpdate(id, { $set: updates }, { new: true }),
    deleteSocial: async (_, { id }) => { await Social.findByIdAndDelete(id); return "Deleted"; },

    createQuickLink: async (_, args) => await new QuickLinks(args).save(),
    updateQuickLink: async (_, { id, ...updates }) => await QuickLinks.findByIdAndUpdate(id, { $set: updates }, { new: true }),
    deleteQuickLink: async (_, { id }) => { await QuickLinks.findByIdAndDelete(id); return "Deleted"; },

    createContact: async (_, args) => await new Contact(args).save(),
    updateContact: async (_, { id, ...updates }) => await Contact.findByIdAndUpdate(id, { $set: updates }, { new: true }),
    deleteContact: async (_, { id }) => { await Contact.findByIdAndDelete(id); return "Deleted"; },

    createBooking: async (_, args) => await new Booking(args).save(),
    updateBooking: async (_, { id, ...updates }) => await Booking.findByIdAndUpdate(id, { $set: updates }, { new: true }),
    deleteBooking: async (_, { id }) => { await Booking.findByIdAndDelete(id); return "Deleted"; },

    registerUser: async (_, { email, password }) => {
      const existing = await User.findOne({ email });
      if (existing) throw new Error("User already exists");
      const user = new User({ email, password });
      await user.save();
      return { message: "User registered successfully", user };
    },

    loginUser: async (_, { email, password }, context) => {
      const user = await User.findOne({ email });
      if (!user) throw new Error("Invalid credentials");
      const isMatch = await user.comparePassword(password);
      if (!isMatch) throw new Error("Invalid credentials");

      const token = user.generateAccessToken();
      user.lastLoginAt = new Date();
      await user.save();

      context.res.cookie("AccessToken", token, {
        httpOnly: true,
        secure: isProd,
        sameSite: isProd ? "none" : "lax",
        path: "/",
        maxAge: 24 * 60 * 60 * 1000,
      });

      return { message: "Login successful", user, token };
    },

    logoutUser: async (_, __, context) => {
      context.res.clearCookie("AccessToken", {
        httpOnly: true,
        secure: isProd,
        sameSite: isProd ? "none" : "lax",
        path: "/", 
      });
      return "User logged out successfully";
    },

    updateSelf: async (_, { email, password }, context) => {
      if (!context.user) throw new Error("Unauthorized");
      const user = await User.findById(context.user.id);
      if (!user) throw new Error("User not found");

      const updates = {};
      if (email) updates.email = email;
      if (password) {
        const isSame = await user.comparePassword(password);
        if (isSame) throw new Error("New password cannot be the same as old");
        const saltRounds = Number(process.env.SALT_ROUNDS) || 10;
        updates.password = await bcrypt.hash(password, saltRounds);
      }

      return await User.findByIdAndUpdate(context.user.id, { $set: updates }, { new: true }).select("-password");
    },

    deleteUser: async (_, { id }) => {
      await User.findByIdAndDelete(id);
      return "User deleted";
    }
  },

  EventSec: {
    events: async () => await Event.find({ isActive: true }),
    eventPartners: async () => await EventPartner.find()
  },
  GallerySec: {
    videos: async () => await GalleryVedio.find()
  },
  Footer: {
    socials: async (parent) => await Social.find({ _id: { $in: parent.socials } }),
    quickLinks: async (parent) => await QuickLinks.find({ _id: { $in: parent.quickLinks } })
  }
};