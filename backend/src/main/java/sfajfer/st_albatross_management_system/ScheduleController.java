package sfajfer.st_albatross_management_system;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/schedules")
public class ScheduleController {

    @Autowired
    private ScheduleRepository repository;

    @GetMapping
    public List<Schedule> getAllSchedules() {
        return repository.findAll();
    }

    @PostMapping
    public Schedule createSchedule(@RequestBody Schedule schedule) {
        return repository.save(schedule);
    }

    @PutMapping("/{id}")
    public Schedule updateSchedule(@PathVariable String id, @RequestBody Schedule schedule) {
        schedule.setId(id); 
        return repository.save(schedule);
    }

    @DeleteMapping("/{id}")
    public void deleteSchedule(@PathVariable String id) {
        repository.deleteById(id);
    }
}