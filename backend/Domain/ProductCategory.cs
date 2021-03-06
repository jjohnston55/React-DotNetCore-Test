﻿using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace DotNetCore_Test.Domain
{
    public class ProductCategory
    {
        [Key]
        public string CategoryName { get; set; }
        [Key]
        public string ProductName { get; set; }

        public virtual Category Category { get; set; }
        public virtual Product Product { get; set; }
    }
}
