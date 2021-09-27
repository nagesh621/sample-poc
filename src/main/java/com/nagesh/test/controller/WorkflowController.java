package com.nagesh.test.controller;

import com.nagesh.test.entity.Workflow;
import com.nagesh.test.repo.WorkflowRepository;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.net.URI;
import java.net.URISyntaxException;
import java.util.List;

@RestController
@RequestMapping("/workflow")
public class WorkflowController {

    private final WorkflowRepository workflowRepository;

    public WorkflowController(WorkflowRepository workflowRepository) {
        this.workflowRepository = workflowRepository;
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
        Workflow savedWorkflow = workflowRepository.save(workflow);
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
