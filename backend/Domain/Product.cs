using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace DotNetCore_Test.Domain
{
    public class Product
    {
        [Key]
        public string ProductName { get; set; }
        public double Cost { get; set; }
        public string Description { get; set; }
        public bool Active { get; set; }

        public virtual ICollection<ProductCategory> ProductCategories { get; set; }
    }
}
