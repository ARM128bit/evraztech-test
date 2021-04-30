using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

using evraztech_test.Models;

using Microsoft.EntityFrameworkCore;
using Newtonsoft.Json.Linq;

namespace evraztech_test.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class UserController : ControllerBase
    {

        private ApplicationContext db;
        public UserController(ApplicationContext context)
        {
            db = context;
        }
        [HttpGet]
        public IEnumerable<User> Get()
        {
            return db.User.ToList();
        }

        [HttpPost]
        public async Task<IActionResult> CreateNewEquipment([FromForm] User user)
        {
            if (ModelState.IsValid)
            {
                user.ID = Guid.NewGuid();
                db.User.Add(user);
                await db.SaveChangesAsync();
                return Created("CreateNewEquipment", user);
            } else
            {
                return BadRequest();
            }
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(string id)
        {
            User user = await db.User.FirstOrDefaultAsync(p => p.ID.ToString() == id);
            if (user == null)
            {
                return NotFound();
            }
            db.User.Remove(user);
            await db.SaveChangesAsync();
            return NoContent();
        }
    }
}
