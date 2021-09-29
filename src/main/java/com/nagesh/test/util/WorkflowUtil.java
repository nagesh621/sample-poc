package com.nagesh.test.util;

import com.nagesh.test.entity.Process;
import com.nagesh.test.entity.ProcessTask;
import com.nagesh.test.repo.ProcessRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.ParameterizedTypeReference;
import org.springframework.http.*;
import org.springframework.stereotype.Component;
import org.springframework.util.LinkedMultiValueMap;
import org.springframework.util.MultiValueMap;
import org.springframework.web.client.RestTemplate;

import java.util.ArrayList;
import java.util.List;

@Component
public class WorkflowUtil {

    private final ProcessRepository repo;

    @Autowired
    public WorkflowUtil(ProcessRepository repo) {
        this.repo = repo;
    }

    public Process startWorkflow(Long workflowId)
    {
        final String uri = "http://localhost:8080/engine-rest/process-definition/key/sample-project-process/start";
        RestTemplate restTemplate = new RestTemplate();
        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_JSON);

        MultiValueMap<String, String> map = new LinkedMultiValueMap<>();
        HttpEntity<MultiValueMap<String, String>> request = new HttpEntity<>(map, headers);

        Process response = restTemplate.postForObject(uri, request, Process.class);
        response.setWorkflowId(workflowId);
        repo.save(response);
        return response;
    }

    public void moveToken(String processInstanceId){
        String uri = "http://localhost:8080/engine-rest/task/?processInstanceId="+processInstanceId;
        RestTemplate restTemplate = new RestTemplate();
        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_JSON);
        ResponseEntity<List<ProcessTask>> rateResponse =
                restTemplate.exchange(uri,
                        HttpMethod.GET, null, new ParameterizedTypeReference<List<ProcessTask>>() {
                        });
        List<ProcessTask> taskList = rateResponse.getBody();

        uri="http://localhost:8080/engine-rest/task/"+ taskList.get(0).getId()+"/complete";

        MultiValueMap<String, String> map = new LinkedMultiValueMap<>();
        HttpEntity<MultiValueMap<String, String>> request = new HttpEntity<>(map, headers);

        String result = restTemplate.postForObject(uri, request, String.class);

        System.out.println(result);
    }
}
