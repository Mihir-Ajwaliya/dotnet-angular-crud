using CRUDAPI.Data;
using Microsoft.AspNetCore.Mvc;

namespace CRUDAPI.Controllers
{
    [Route("API/[controller]")]
    [ApiController]
    public class EmployeeController : ControllerBase
    {
        private readonly EmployeeRepository _employeeRepository;
        public EmployeeController(EmployeeRepository employeeRepository)
        {
            _employeeRepository = employeeRepository;
        }
        [HttpGet]
        public async Task<ActionResult> GetEmployeeList()
        {
            var employeelist = await _employeeRepository.GetAllEmployeeAsync();
            return Ok(employeelist);
        }
        [HttpPost]
        public async Task<ActionResult> AddEmployee([FromBody]AddEmployeeDTO employee)
        {
            var newEmp = new Employee
            {
                Age = employee.Age,
                Name = employee.Name,
                Email = employee.Email,
                Phone = employee.Phone,
                Salary = employee.Salary,
            };
            var employeeFromDb = await _employeeRepository.AddEmployeeAsync(newEmp);
            return Ok(employeeFromDb);
        }
        [HttpGet("{id}")]
        public async Task<ActionResult> GetEmployeeById(int id)
        {
            var employee = await _employeeRepository.GetEmployeeById(id);
            return Ok(employee);
        }
        [HttpPut("{id}")]
        public async Task<ActionResult> UpdateEmployee([FromRoute]int id, [FromBody]UpadateDto employeedto)
        {
            var employee = new Employee
            {
                Id = id,
                Name = employeedto.Name,
                Email = employeedto.Email,
                Phone = employeedto.Phone,
                Age = employeedto.Age,
                Salary= employeedto.Salary,
            };
            var updatedEmp = await _employeeRepository.UpdateEmployeeAsync(employee);
            return Ok(updatedEmp);
        }
        [HttpDelete("{id}")]
        public async Task<ActionResult> DeleteEmployee(int id)
        {
            var employee = await _employeeRepository.DeleteEmployeeAsync(id);
            return Ok(employee);
        }
    }
}
