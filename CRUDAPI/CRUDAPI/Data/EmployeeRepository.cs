using Microsoft.EntityFrameworkCore;

namespace CRUDAPI.Data
{
    public class EmployeeRepository
    {
        private readonly AppDbContext _appDbContext;
        public EmployeeRepository(AppDbContext appDbContext)
        {
            _appDbContext=appDbContext;
        }

        public async Task<Employee> AddEmployeeAsync(Employee employee)
        {
            await _appDbContext.AddAsync(employee);
            await _appDbContext.SaveChangesAsync(); 
            return employee;
        }
        public async Task<List<Employee>> GetAllEmployeeAsync()
        {
            return await _appDbContext.Employees.ToListAsync();
        }
        public async Task<Employee> GetEmployeeById(int id)
        {
            return await _appDbContext.Employees.FindAsync(id);
        }
        public async Task<Employee> UpdateEmployeeAsync(Employee employee)
        {
            var empFromDb = await _appDbContext.Employees.FindAsync(employee.Id);
            if (empFromDb == null)
            {
                throw new Exception("Employee not found");
            }
            empFromDb.Name = employee.Name;
            empFromDb.Email = employee.Email;
            empFromDb.Phone = employee.Phone;
            empFromDb.Age = employee.Age;
            empFromDb.Salary = employee.Salary;
            await _appDbContext.SaveChangesAsync();
            return employee ;
        }
        public async Task<Employee> DeleteEmployeeAsync(int id)
        {
            var employeee = await _appDbContext.Employees.FindAsync(id);
            if (employeee == null)
            {
                throw new Exception("Employee not found");
            }
            _appDbContext.Employees.Remove(employeee);
            await _appDbContext.SaveChangesAsync();
            return employeee ;
        }
    }
}
