using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace DotNetCore_Test.Domain
{
    public class Category
    {
        [Key]
        public string CategoryName { get; set; }
        public bool Active { get; set; }
        public string Description { get; set; }

        public virtual ICollection<ProductCategory> ProductCategories { get; set; }
    }
}
