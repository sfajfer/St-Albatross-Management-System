package sfajfer.st_albatross_management_system;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Document(collection = "schedules")
public class Schedule {
    @Id
    private String id;
    private String date;
    private String time;
    private String patientKey; 
    private String reason;
    private String status;

    public Schedule(String id, String date, String time, String patientKey, String reason, String status) {
        this.id = id;
        this.date = date;
        this.time = time;
        this.patientKey = patientKey;
        this.reason = reason;
        this.status = status;
    }

    public Schedule() {}

    public String getId() { return id; }
    public String getDate() { return date; }
    public String getTime() { return time; }
    public String getPatientKey() { return patientKey; }
    public String getReason() { return reason; }
    public String getStatus() { return status; }

    public void setId(String id) {
        this.id = id;
    }
}