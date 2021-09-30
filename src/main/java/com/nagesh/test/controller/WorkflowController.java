package com.nagesh.test.controller;

import com.nagesh.test.entity.Workflow;
import com.nagesh.test.entity.Process;
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

    private final WorkflowUtil util;

    @Autowired
    public WorkflowController(WorkflowRepository workflowRepository, WorkflowUtil util) {
        this.workflowRepository = workflowRepository;
        this.util = util;
    }

    @GetMapping
    public List<Workflow> getWorkflowss() {
        return workflowRepository.findAll();
    }

    @GetMapping("/{id}")
    public Workflow getWorkflow(@PathVariable Long id) {
        return workflowRepository.findById(id).orElseThrow(RuntimeException::new);
    }

    @PostMapping
    public ResponseEntity createWorkflow(@RequestBody Workflow workflow) throws URISyntaxException {
        Boolean review = false;
        Workflow savedWorkflow = workflowRepository.save(workflow);
        Process process = util.startWorkflow(savedWorkflow.getId(), "manual");
        util.moveToken(process.getId(), review);
        return ResponseEntity.created(new URI("/workflows/" + savedWorkflow.getId())).body(savedWorkflow);
    }

    @PutMapping("/{id}")
    public ResponseEntity updateWorkflow(@PathVariable Long id, @RequestBody Workflow workflow) {
        Workflow currentWorkflow = workflowRepository.findById(id).orElseThrow(RuntimeException::new);
        currentWorkflow.setName(workflow.getName());
        currentWorkflow.setEmail(workflow.getEmail());
        currentWorkflow = workflowRepository.save(workflow);

        return ResponseEntity.ok(currentWorkflow);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity deleteWorkflow(@PathVariable Long id) {
        workflowRepository.deleteById(id);
        return ResponseEntity.ok().build();
    }
}
