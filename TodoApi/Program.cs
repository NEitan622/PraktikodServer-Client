
// using System.Diagnostics.Eventing.Reader;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.ApiExplorer;
using Microsoft.EntityFrameworkCore;
using TodoApi;

var builder = WebApplication.CreateBuilder(args);


builder.Services.AddDbContext<ToDoDbContext>(options =>
    options.UseMySql(builder.Configuration.GetConnectionString("ToDoDB"),
    new MySqlServerVersion(new Version(9, 0, 1)))); // 


//swagger8.0.41-mysql"

builder.Services.AddControllers();

builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

builder.Services.AddCors(o => o.AddPolicy("MyPolicy", builder =>
       {
           builder.AllowAnyOrigin()
                  .AllowAnyMethod()
                  .AllowAnyHeader();
       }));

var app = builder.Build();



if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.MapGet("/tasks", async (ToDoDbContext db) =>
{
    return await db.Items.ToListAsync();
});

app.MapPost("/add", async (ToDoDbContext db, [FromBody] string name) =>
{
    if (string.IsNullOrEmpty(name))
    {
        return Results.BadRequest("Item cannot be null.");
    }
    // Item item = new Item();
    Item item = new()
    {
        Name = name,
        IsComplete = false
    };
    // item.Name = name;
    await db.Items.AddAsync(item);
    await db.SaveChangesAsync(); // הוסף await כאן

    return Results.Ok("Add succeeded!"); // החזר תשובה עם קוד סטטוס 200
});


app.MapPut("/update/{id}", async (ToDoDbContext db, int id) =>
{

    var x = await db.Items.FindAsync(id);
    if (x != null)
    {
        //    x.Name=item.Name;
        x.IsComplete = !x.IsComplete;

        db.Items.Update(x);
        db.SaveChanges();
        return "update succsed!";
    }
    return "update faild!";
});



app.MapDelete("/delete/{id}", async (int id, ToDoDbContext db) =>
{
    if (await db.Items.FindAsync(id) is Item i)
    {
        db.Items.Remove(i);
        await db.SaveChangesAsync();
        return "delete succssesd";
    }
    return "delete faild!";
});

//cors
app.UseRouting();
app.UseCors("MyPolicy");
app.UseAuthorization();
app.MapControllers();

app.Run();
