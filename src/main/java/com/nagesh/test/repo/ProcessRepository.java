package com.nagesh.test.repo;

import com.nagesh.test.entity.Process;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ProcessRepository extends JpaRepository<Process, Long> {

    Process findByWorkflowId(Long workflow_id);
}

