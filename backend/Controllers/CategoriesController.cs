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
    public class CategoriesController : ControllerBase
    {
        private readonly TestContext _context;

        public CategoriesController(TestContext context)
        {
            _context = context;
        }

        // GET: api/Categories
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Category>>> GetCategories()
        {
            return await _context.Categories.ToListAsync();
        }

        // GET: api/Categories/Beverages
        [HttpGet("{categoryName}")]
        public async Task<ActionResult<Category>> GetCategory(string categoryName)
        {
            var category = await _context.Categories.FindAsync(categoryName);

            if (category == null)
            {
                return NotFound();
            }

            return category;
        }

        // PUT: api/Categories/Beverages
        // To protect from overposting attacks, enable the specific properties you want to bind to, for
        // more details, see https://go.microsoft.com/fwlink/?linkid=2123754.
        [HttpPut("{categoryName}")]
        public async Task<IActionResult> PutCategory(string categoryName, Category category)
        {
            if (categoryName != category.CategoryName)
            {
                return BadRequest();
            }

            _context.Entry(category).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!CategoryExists(categoryName))
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

        // POST: api/Categories
        // To protect from overposting attacks, enable the specific properties you want to bind to, for
        // more details, see https://go.microsoft.com/fwlink/?linkid=2123754.
        [HttpPost]
        public async Task<ActionResult<Category>> PostCategory([FromBody] Category category)
        {
            _context.Categories.Add(category);
            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateException)
            {
                if (CategoryExists(category.CategoryName))
                {
                    return Conflict();
                }
                else
                {
                    throw;
                }
            }

            return CreatedAtAction("GetCategory", new { categoryName = category.CategoryName }, category);
        }

        // DELETE: api/Categories/Beverages
        [HttpDelete("{categoryName}")]
        public async Task<ActionResult<Category>> DeleteCategory(string categoryName)
        {
            var category = await _context.Categories.FindAsync(categoryName);
            if (category == null)
            {
                return NotFound();
            }

            _context.Categories.Remove(category);
            await _context.SaveChangesAsync();

            return category;
        }

        private bool CategoryExists(string categoryName)
        {
            return _context.Categories.Any(e => e.CategoryName == categoryName);
        }
    }
}
