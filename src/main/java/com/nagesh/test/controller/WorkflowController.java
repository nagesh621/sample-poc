package com.nagesh.test.controller;

import com.nagesh.test.entity.IdentityLinks;
import com.nagesh.test.entity.Workflow;
import com.nagesh.test.entity.Process;
import com.nagesh.test.repo.ProcessRepository;
import com.nagesh.test.repo.WorkflowRepository;
import com.nagesh.test.util.WorkflowUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.net.URI;
import java.net.URISyntaxException;
import java.util.List;

@RestController
@RequestMapping("/workflow")
public class WorkflowController {

    private final WorkflowRepository workflowRepository;

    private final ProcessRepository processRepo;

    private final WorkflowUtil util;

    @Autowired
    public WorkflowController(WorkflowRepository workflowRepository, WorkflowUtil util, ProcessRepository processRepo) {
        this.workflowRepository = workflowRepository;
        this.util = util;
        this.processRepo=processRepo;
    }

    @GetMapping
    public List<Workflow> getWorkflowss() {
        return workflowRepository.findByStatus("ACTIVE");
    }

    @GetMapping("/reviewwf")
    public List<Workflow> getReviewWorkflows() {
        return workflowRepository.findByStatus("REVIEW");
    }

    @GetMapping("/closedwf")
    public List<Workflow> getClosedWorkflows() {
        return workflowRepository.findByStatus("CLOSED");
    }

    @GetMapping("/{id}")
    public Workflow getWorkflow(@PathVariable Long id) {
        return workflowRepository.findById(id).orElseThrow(RuntimeException::new);
    }

    @GetMapping("/canClose/{id}")
    public ResponseEntity getCanClose(@PathVariable Long id) throws URISyntaxException{
        Workflow workflow = workflowRepository.findById(id).orElseThrow(RuntimeException::new);
        Process process = processRepo.findByWorkflowId(workflow.getId());
        IdentityLinks idlinks = util.canClose(process.getId());
        return ResponseEntity.created(new URI("/workflows/canClose/" + id)).body(idlinks);
    }

    @PostMapping
    public ResponseEntity createWorkflow(@RequestBody Workflow workflow) throws URISyntaxException {
        Boolean review = false;
        workflow.setStatus("ACTIVE");
        Workflow savedWorkflow = workflowRepository.save(workflow);
        Process process = util.startWorkflow(savedWorkflow.getId(), savedWorkflow.getClosuretype().toLowerCase());
        util.moveToken(process.getId(), review);
        return ResponseEntity.created(new URI("/workflows/" + savedWorkflow.getId())).body(savedWorkflow);
    }

    @PostMapping("/close/{id}")
    public ResponseEntity closeWorkflow(@RequestBody Workflow workflow) throws URISyntaxException {
        Boolean review = false;
        workflow.setStatus("CLOSED");
        Workflow savedWorkflow = workflowRepository.save(workflow);
        Process process = processRepo.findByWorkflowId(savedWorkflow.getId());
        util.moveToken(process.getId(), review);
        return ResponseEntity.created(new URI("/workflows/" + savedWorkflow.getId())).body(savedWorkflow);
    }

    @PostMapping("/review/{id}")
    public ResponseEntity reviewWorkflow(@RequestBody Workflow workflow) throws URISyntaxException {
        Boolean review = true;
        workflow.setStatus("REVIEW");
        Workflow savedWorkflow = workflowRepository.save(workflow);
        Process process = processRepo.findByWorkflowId(savedWorkflow.getId());
        util.moveToken(process.getId(), review);
        return ResponseEntity.created(new URI("/workflows/" + savedWorkflow.getId())).body(savedWorkflow);
    }



    @PutMapping("/{id}")
    public ResponseEntity updateWorkflow(@PathVariable Long id, @RequestBody Workflow workflow) {
        Workflow currentWorkflow = workflowRepository.findById(id).orElseThrow(RuntimeException::new);
        currentWorkflow = workflowRepository.save(workflow);

        return ResponseEntity.ok(currentWorkflow);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity deleteWorkflow(@PathVariable Long id) {
        workflowRepository.deleteById(id);
        return ResponseEntity.ok().build();
    }
}
