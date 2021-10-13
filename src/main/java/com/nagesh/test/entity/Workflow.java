package com.nagesh.test.entity;




import javax.persistence.*;

@Entity
@Table(name = "workflow")
public class Workflow {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String workflowtype;
    private String tradecenter;
    private String branchcode;
    private String refid;
    private String queue;
    private String productcode;
    private String eventtype;
    private String amount;
    private String currency;
    private String closuretype;
    private String comments;
    private String status;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getWorkflowtype() {
        return workflowtype;
    }

    public void setWorkflowtype(String workflowtype) {
        this.workflowtype = workflowtype;
    }

    public String getTradecenter() {
        return tradecenter;
    }

    public void setTradecenter(String tradecenter) {
        this.tradecenter = tradecenter;
    }

    public String getBranchcode() {
        return branchcode;
    }

    public void setBranchcode(String branchcode) {
        this.branchcode = branchcode;
    }

    public String getRefid() {
        return refid;
    }

    public void setRefid(String refid) {
        this.refid = refid;
    }

    public String getQueue() {
        return queue;
    }

    public void setQueue(String queue) {
        this.queue = queue;
    }

    public String getProductcode() {
        return productcode;
    }

    public void setProductcode(String productcode) {
        this.productcode = productcode;
    }

    public String getEventtype() {
        return eventtype;
    }

    public void setEventtype(String eventtype) {
        this.eventtype = eventtype;
    }

    public String getAmount() {
        return amount;
    }

    public void setAmount(String amount) {
        this.amount = amount;
    }

    public String getCurrency() {
        return currency;
    }

    public void setCurrency(String currency) {
        this.currency = currency;
    }

    public String getClosuretype() {
        return closuretype;
    }

    public void setClosuretype(String closuretype) {
        this.closuretype = closuretype;
    }

    public String getComments() {
        return comments;
    }

    public void setComments(String comments) {
        this.comments = comments;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }
}
