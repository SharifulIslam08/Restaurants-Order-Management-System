namespace RestaurantWebAPI.Models
{
    public class SidebarItemsModel
    {
        public int sidebar_item_id { get; set; }
        public string sidebar_item_name { get; set; }
        public int sidebar_item_parent_id { get; set; }
        public string sidebar_item_destination { get; set; }
    }
}
