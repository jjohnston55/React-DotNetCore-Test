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
        public DbSet<ProductCategory> Categories { get; set; }
    }
}
