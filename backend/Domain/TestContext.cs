using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace DotNetCore_Test.Domain
{
    public class TestContext : DbContext
    {
        public TestContext(DbContextOptions<TestContext> options) : base(options) { }
        
        public DbSet<Product> Products { get; set; }
        public DbSet<ProductCategory> ProductCategories { get; set; }
        public DbSet<Category> Categories { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<ProductCategory>().HasKey(pc => new { pc.CategoryName, pc.ProductName });
            modelBuilder.Entity<ProductCategory>().HasOne(pc => pc.Product).WithMany(p => p.ProductCategories).HasForeignKey(pc => pc.ProductName);
            modelBuilder.Entity<ProductCategory>().HasOne(pc => pc.Category).WithMany(c => c.ProductCategories).HasForeignKey(pc => pc.CategoryName);

            modelBuilder.Entity<Product>().HasData(new Product() { ProductName = "Water", Active = true, Description = "Fresh from the Mountains", Cost = 0.99 });
            modelBuilder.Entity<Product>().HasData(new Product() { ProductName = "Milk", Active = true, Description = "Cow, Goat, Almond", Cost = 5.00 });
            modelBuilder.Entity<Product>().HasData(new Product() { ProductName = "Cheese", Active = true, Description = "Cheddar, Pizza, Gouda", Cost = 8.00 });
            modelBuilder.Entity<Product>().HasData(new Product() { ProductName = "Ketchup", Active = true, Description = "Goes with everything", Cost = 10.99 });
            modelBuilder.Entity<Product>().HasData(new Product() { ProductName = "Steak", Active = true, Description = "Alberta Grade", Cost = 50.00 });
            modelBuilder.Entity<Category>().HasData(new Category() { CategoryName = "Beverages", Active = true, Description = "Soft drinks" });
            modelBuilder.Entity<Category>().HasData(new Category() { CategoryName = "Dairy", Active = true, Description = "Cheeses" });
            modelBuilder.Entity<Category>().HasData(new Category() { CategoryName = "Condiments", Active = true, Description = "Sweet and savory sauces, relishes, spreads, and seasonings" });
            modelBuilder.Entity<Category>().HasData(new Category() { CategoryName = "Meat", Active = true, Description = "Prepared meats" });

            modelBuilder.Entity<ProductCategory>().HasData(new ProductCategory() { CategoryName = "Beverage", ProductName = "Water" });
            modelBuilder.Entity<ProductCategory>().HasData(new ProductCategory() { CategoryName = "Beverage", ProductName = "Milk" });
            modelBuilder.Entity<ProductCategory>().HasData(new ProductCategory() { CategoryName = "Dairy", ProductName = "Milk" });
            modelBuilder.Entity<ProductCategory>().HasData(new ProductCategory() { CategoryName = "Dairy", ProductName = "Cheese" });
            modelBuilder.Entity<ProductCategory>().HasData(new ProductCategory() { CategoryName = "Condiments", ProductName = "Ketchup" });
            modelBuilder.Entity<ProductCategory>().HasData(new ProductCategory() { CategoryName = "Meat", ProductName = "Steak" });
        }
    }
}
