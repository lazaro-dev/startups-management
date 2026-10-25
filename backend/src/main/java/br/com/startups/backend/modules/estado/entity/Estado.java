package br.com.startups.backend.modules.estado.entity;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@Entity
@Table(name = "ESTADO")
public class Estado {

    @Id
    @Column(name = "ESCUF", length = 2, nullable = false, columnDefinition = "CHAR(2)")
    private String uf;

    @Column(name = "ESCDESC", length = 40, nullable = false)
    private String description;

    public Estado(String uf, String description) {
        this.uf = uf;
        this.description = description;
    }
}