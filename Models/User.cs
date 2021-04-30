using System;
using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace evraztech_test
{
    public class User
    {
        [Required]
        public Guid ID { get; set; }

        [Required]
        public string FirstName { get; set; }

        [Required]
        public string LastName { get; set; }
        public List<Equipment> Equipments { get; set; }
    }
}