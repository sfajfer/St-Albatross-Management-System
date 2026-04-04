package sfajfer.st_albatross_management_system;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;
import java.util.List;

@Document(collection = "patients")
public class Patient {
    @Id
    private String key;
    private String name;
    private String dob;
    private String gender;
    private String contactPhone;
    private List<MedicalRecord> records;

    // 1. Constructor for Patient
    public Patient(String key, String name, String dob, String gender, String contactPhone, List<MedicalRecord> records) {
        this.key = key;
        this.name = name;
        this.dob = dob;
        this.gender = gender;
        this.contactPhone = contactPhone;
        this.records = records;
    }

    // Default constructor for MongoDB
    public Patient() {}

    // 2. The MedicalRecord Inner Class
    public static class MedicalRecord {
        private String date;
        private String complaint;
        private String diagnosis;
        private String actionTaken;
        private String notes;

        public MedicalRecord(String date, String complaint, String diagnosis, String actionTaken, String notes) {
            this.date = date;
            this.complaint = complaint;
            this.diagnosis = diagnosis;
            this.actionTaken = actionTaken;
            this.notes = notes;
        }

        // Default constructor for MongoDB
        public MedicalRecord() {}

        // Getters (Required for React to see the data)
        public String getDate() { return date; }
        public String getComplaint() { return complaint; }
        public String getDiagnosis() { return diagnosis; }
        public String getActionTaken() { return actionTaken; }
        public String getNotes() { return notes; }
    }

    // Getters for Patient
    public String getKey() { return key; }
    public String getName() { return name; }
    public String getDob() { return dob; }
    public String getGender() { return gender; }
    public String getContactPhone() { return contactPhone; }
    public List<MedicalRecord> getRecords() { return records; }
}