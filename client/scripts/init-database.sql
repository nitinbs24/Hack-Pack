-- Initialize EcoFinds database with sample categories
-- This script will be run after Prisma generates the schema

-- Insert default categories
INSERT OR IGNORE INTO categories (id, name, description, createdAt, updatedAt) VALUES
('cat_electronics', 'Electronics', 'Eco-friendly electronics and gadgets', datetime('now'), datetime('now')),
('cat_clothing', 'Clothing', 'Sustainable fashion and apparel', datetime('now'), datetime('now')),
('cat_home', 'Home & Garden', 'Sustainable home and garden products', datetime('now'), datetime('now')),
('cat_books', 'Books', 'Educational and entertainment books', datetime('now'), datetime('now')),
('cat_sports', 'Sports & Outdoors', 'Outdoor and sports equipment', datetime('now'), datetime('now')),
('cat_beauty', 'Beauty & Health', 'Natural beauty and health products', datetime('now'), datetime('now'));
