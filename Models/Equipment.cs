using System;
using Microsoft.EntityFrameworkCore;
using System.ComponentModel.DataAnnotations;

namespace evraztech_test
{
    public class Equipment
    {
        [Required]
        public DateTime CreationDate { get; set; }

        [Required]
        public Guid ID { get; set; }

        [Required]
        public string Model { get; set; }

        [Required]
        public string Description { get; set; }
        [Required]
        public Guid TypeID { get; set; }
        public EquipmentType Type { get; set; }
    }
}
