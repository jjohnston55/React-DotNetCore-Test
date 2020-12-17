using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using DotNetCore_Test.Domain;

namespace DotNetCore_Test.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ProductsController : ControllerBase
    {
        private readonly TestContext _context;

        public ProductsController(TestContext context)
        {
            _context = context;
        }

        // GET: api/Products
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Product>>> GetProducts()
        {
            return await _context.Products.Select(p => new Product 
            { 
                ProductName = p.ProductName, 
                Active = p.Active, 
                Cost = p.Cost, 
                Description = p.Description, 
                ProductCategories = _context.ProductCategories.Where(pc => pc.ProductName == p.ProductName).ToList()
            }).ToListAsync();
        }

        // GET: api/Products/category/Beverage
        [HttpGet("category/{categoryName}")]
        public async Task<ActionResult<IEnumerable<Product>>> GetProductsByCategory(string categoryName)
        {
            var products = await _context.ProductCategories.Where(pc => pc.CategoryName == categoryName).Select(x => x.Product).ToListAsync();

            if (products == null || products.Count == 0)
            {
                return NotFound();
            }

            return products;
        }

        // GET: api/Products/Water
        [HttpGet("{productName}")]
        public async Task<ActionResult<Product>> GetProduct(string productName)
        {
            var product = await _context.Products.Select(p => new Product
            {
                ProductName = p.ProductName,
                Active = p.Active,
                Cost = p.Cost,
                Description = p.Description,
                ProductCategories = _context.ProductCategories.Where(pc => pc.ProductName == p.ProductName).ToList()
            }).Where(p => p.ProductName == productName).FirstAsync();

            if (product == null)
            {
                return NotFound();
            }

            return product;
        }

        // PUT: api/Products/Water
        // To protect from overposting attacks, enable the specific properties you want to bind to, for
        // more details, see https://go.microsoft.com/fwlink/?linkid=2123754.
        [HttpPut("{productName}")]
        public async Task<IActionResult> PutProduct(string productName, [FromBody] Product product)
        {
            if (productName != product.ProductName)
            {
                return BadRequest();
            }

            _context.Entry(product).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!ProductExists(productName))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return NoContent();
        }

        // POST: api/Products
        // To protect from overposting attacks, enable the specific properties you want to bind to, for
        // more details, see https://go.microsoft.com/fwlink/?linkid=2123754.
        [HttpPost]
        public async Task<ActionResult<Product>> PostProduct([FromBody] Product product)
        {
            var productCategories = product.ProductCategories;
            _context.Products.Add(product);
            _context.ProductCategories.AddRange(productCategories);
            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateException)
            {
                if (ProductExists(product.ProductName))
                {
                    return Conflict();
                }
                else
                {
                    throw;
                }
            }

            return CreatedAtAction("GetProduct", new { productName = product.ProductName }, product);
        }

        // DELETE: api/Products/Water
        [HttpDelete("{productName}")]
        public async Task<ActionResult<Product>> DeleteProduct(string productName)
        {
            var product = await _context.Products.FindAsync(productName);
            if (product == null)
            {
                return NotFound();
            }

            _context.Products.Remove(product);
            
            var productCategories = await _context.ProductCategories.Where(pc => pc.ProductName == productName).ToListAsync();
            if (productCategories.Count > 0)
            {
                _context.ProductCategories.RemoveRange(productCategories);
            }

            await _context.SaveChangesAsync();

            return product;
        }

        private bool ProductExists(string productName)
        {
            return _context.Products.Any(e => e.ProductName == productName);
        }
    }
}
