import { pgTable, text, serial, integer, boolean, timestamp } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  username: text("username").notNull().unique(),
  password: text("password").notNull(),
});

export const inspections = pgTable("inspections", {
  id: serial("id").primaryKey(),
  school: text("school").notNull(),
  date: text("date").notNull(),
  inspectionType: text("inspection_type").notNull(), // 'single_room' or 'whole_building'
  locationDescription: text("location_description").notNull(),
  roomNumber: text("room_number"), // Optional for single room inspections
  buildingName: text("building_name"), // Optional for whole building inspections
  floors: integer("floors").notNull(),
  verticalHorizontalSurfaces: integer("vertical_horizontal_surfaces").notNull(),
  ceiling: integer("ceiling").notNull(),
  restrooms: integer("restrooms").notNull(),
  customerSatisfaction: integer("customer_satisfaction").notNull(),
  trash: integer("trash").notNull(),
  projectCleaning: integer("project_cleaning").notNull(),
  activitySupport: integer("activity_support").notNull(),
  safetyCompliance: integer("safety_compliance").notNull(),
  equipment: integer("equipment").notNull(),
  monitoring: integer("monitoring").notNull(),
  notes: text("notes"),
  images: text("images").array(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const custodialNotes = pgTable("custodial_notes", {
  id: serial("id").primaryKey(),
  school: text("school").notNull(),
  date: text("date").notNull(),
  location: text("location").notNull(),
  locationDescription: text("location_description").notNull(),
  notes: text("notes").notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const insertUserSchema = createInsertSchema(users).pick({
  username: true,
  password: true,
});

export const insertInspectionSchema = createInsertSchema(inspections).omit({
  id: true,
  createdAt: true,
});

export const insertCustodialNoteSchema = createInsertSchema(custodialNotes).omit({
  id: true,
  createdAt: true,
});

export type InsertUser = z.infer<typeof insertUserSchema>;
export type User = typeof users.$inferSelect;
export type InsertInspection = z.infer<typeof insertInspectionSchema>;
export type Inspection = typeof inspections.$inferSelect;
export type InsertCustodialNote = z.infer<typeof insertCustodialNoteSchema>;
export type CustodialNote = typeof custodialNotes.$inferSelect;
