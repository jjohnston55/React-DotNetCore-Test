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
    public class ProductCategoriesController : ControllerBase
    {
        private readonly TestContext _context;

        public ProductCategoriesController(TestContext context)
        {
            _context = context;
        }

        // GET: api/ProductCategories
        [HttpGet]
        public async Task<ActionResult<IEnumerable<ProductCategory>>> GetProductCategories()
        {
            return await _context.ProductCategories.ToListAsync();
        }

        // GET: api/ProductCategories/Beverage/Water
        [HttpGet("{categoryName}/{productName}")]
        public async Task<ActionResult<ProductCategory>> GetProductCategory(string categoryName, string productName)
        {
            var productCategory = await _context.ProductCategories.FindAsync(productName, categoryName);

            if (productCategory == null)
            {
                return NotFound();
            }

            return productCategory;
        }

        // POST: api/ProductCategories
        // To protect from overposting attacks, enable the specific properties you want to bind to, for
        // more details, see https://go.microsoft.com/fwlink/?linkid=2123754.
        [HttpPost]
        public async Task<ActionResult<ProductCategory>> PostProductCategory(ProductCategory productCategory)
        {
            _context.ProductCategories.Add(productCategory);
            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateException)
            {
                if (ProductCategoryExists(productCategory.CategoryName))
                {
                    return Conflict();
                }
                else
                {
                    throw;
                }
            }

            return CreatedAtAction("GetProductCategory", new { id = productCategory.CategoryName }, productCategory);
        }

        // DELETE: api/ProductCategories/Beverage/Water
        [HttpDelete("{categoryName}/{productName}")]
        public async Task<ActionResult<ProductCategory>> DeleteProductCategory(string id)
        {
            var productCategory = await _context.ProductCategories.FindAsync(id);
            if (productCategory == null)
            {
                return NotFound();
            }

            _context.ProductCategories.Remove(productCategory);
            await _context.SaveChangesAsync();

            return productCategory;
        }

        private bool ProductCategoryExists(string id)
        {
            return _context.ProductCategories.Any(e => e.CategoryName == id);
        }
    }
}
