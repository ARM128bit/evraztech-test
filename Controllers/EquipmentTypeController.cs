﻿using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

using evraztech_test.Models;

using Microsoft.EntityFrameworkCore;

namespace evraztech_test.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class EquipmentTypeController : ControllerBase
    {

        private ApplicationContext db;
        public EquipmentTypeController(ApplicationContext context)
        {
            db = context;
        }
        [HttpGet]
        public IEnumerable<EquipmentType> Get()
        {
            return db.EquipmentType.ToList();
        }

        [HttpPost]
        public async Task<IActionResult> Post([FromForm] EquipmentType equipmentType)
        {
            equipmentType.ID = Guid.NewGuid();
            db.EquipmentType.Add(equipmentType);
            await db.SaveChangesAsync();
            return Ok(equipmentType);
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(string id)
        {
            EquipmentType equipmentType = await db.EquipmentType.FirstOrDefaultAsync(p => p.ID.ToString() == id);
            if (equipmentType == null)
            {
                return NotFound();
            }
            db.EquipmentType.Remove(equipmentType);
            await db.SaveChangesAsync();
            return Ok(equipmentType);
        }
    }
}
