using System.ComponentModel.DataAnnotations;

namespace RestaurantWebAPI.Models
{
    public class DishItemsModel
    {
        [Key]
        public int ID { get; set; }
        public string? Name { get; set; }
        public int ParentMenuID { get; set; }
        public float? Price { get; set; }
        public string? Description { get; set; }
        public string? ImageName { get; set; }
        public IFormFile? Image { get; set; }
        public string? ImagePath { get; set; }
        public string? AddedBy { get; set; }
        public DateTime? AddedDate { get; set; }
        public string? AddedPC { get; set; }
        public string? UpdatedBy { get; set; }
        public DateTime? UpdatedDate { get; set; }
        public string? UpdatedPC { get; set; }
        public List<AddonsModel>? addonListArray { get; internal set; }
    }
}
