
using Microsoft.AspNetCore.Mvc;
using RoadTrackingService.Models;
using RoadTrackingService.Services;

namespace RoadTrackingService.Controllers
{

    /**
    Author: Masith Pramuditha
    Note: This controller is option for manual vehicle location updates, change the UpadteVehicleLocatiopn function accordingly
    **/
    [ApiController]
    [Route("api/vehicle")]
    public class VehicleController : ControllerBase
    {
        // private readonly VehicleService _vehicleService;

        // public VehicleController(VehicleService vehicleService){
        //     _vehicleService = vehicleService;
        // }

        //  [HttpPost("update-location")]
        // public async Task<IActionResult> UpdateVehicleLocation([FromBody] VehicleLocation location)
        // {
        //     if (location == null)
        //     {
        //         return BadRequest("Invalid data.");
        //     }

        //     //await _vehicleService.AddVehicleLocation(location);
        //     return Ok("Vehicle location updated successfully.");
        // }
    }
}