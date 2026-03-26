using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using WaterProject.API.Data;

namespace WaterProject.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class WaterController : ControllerBase
    {
        private WaterDbContext _waterContext;

        public WaterController(WaterDbContext temp)
        {
            _waterContext = temp;
        }

        [HttpGet("AllProjects")]
        public IActionResult GetProjects(int pageSize, int pageNum, [FromQuery] List<string>? projectTypes = null)
        {
            var query = _waterContext.Projects.AsQueryable();

            if (projectTypes != null && projectTypes.Any())
            {
                query = query.Where(p => projectTypes.Contains(p.ProjectType));
            }

            var totalNumberProjects = query.Count();

            var something = query.Skip((pageNum - 1) * pageSize).Take(pageSize).ToList();


            var someObject = (new
            {
                Projects = something,
                TotalProjects = totalNumberProjects
            });

            return Ok(someObject);
        }

        [HttpGet("GetProjectTypes")]
        public IActionResult GetProjectTypes()
        {
            var projectTypes = _waterContext.Projects.Select(x => x.ProjectType).Distinct().ToList();

            return Ok(projectTypes);
        }
    }
}
